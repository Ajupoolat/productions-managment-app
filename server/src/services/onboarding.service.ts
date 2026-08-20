import * as onboardingRepository from '../repositories/onboarding.repository';
import * as userRepository from '../repositories/user.repository';
import * as documentRepository from '../repositories/document.repository';
import { OnboardingApplicationInput, OnboardingReviewInput } from '../dto/onboarding/onboarding.dto';
import { AppError } from '../utils/AppError';
import { OnboardingStatus } from '../constants/onboarding-status';
import { Types } from 'mongoose';
import { deleteFromCloudinary } from '../utils/cloudinary.util';

export const submitApplication = async (
  userId: string,
  data: OnboardingApplicationInput,
  files?: Express.Multer.File[]
) => {
  const existingApp = await onboardingRepository.findByUserId(userId);

  if (existingApp && existingApp.status !== OnboardingStatus.REJECTED && existingApp.status !== OnboardingStatus.CHANGES_REQUESTED) {
    throw new AppError('You already have an active onboarding application.', 400);
  }

  let application;
  if (existingApp) {
    application = await onboardingRepository.updateByUserId(userId, {
      ...data,
      status: OnboardingStatus.PENDING,
    });
  } else {
    application = await onboardingRepository.create({
      userId: new Types.ObjectId(userId),
      ...data,
      status: OnboardingStatus.PENDING,
    });
  }

  if (application && files && files.length > 0 && data.documentsMetadata) {
    // Delete old documents if re-submitting after REJECTED/CHANGES_REQUESTED
    if (existingApp) {
      const oldDocuments = await documentRepository.findByOnboardingId(application._id);
      
      // Step 1: Delete from Cloudinary
      if (oldDocuments.length > 0) {
        await Promise.all(
          oldDocuments.map((doc) => deleteFromCloudinary(doc.publicId))
        );
      }

      // Step 2: Delete from MongoDB
      await documentRepository.deleteByOnboardingId(application._id);
    }

    const documentDocs = files.map((file) => {
      const meta = data.documentsMetadata?.find((m) => m.fileName === file.originalname);
      return {
        onboardingId: application._id,
        type: meta ? meta.type : 'OTHER',
        url: file.path, // multer-storage-cloudinary provides the URL in file.path
        publicId: file.filename, // multer-storage-cloudinary stores the public_id in file.filename
        fileName: file.originalname,
      };
    });

    await documentRepository.createMany(documentDocs);
  }

  return application;
};

export const getMyApplication = async (userId: string) => {
  const application = await onboardingRepository.findByUserId(userId);
  if (!application) {
    throw new AppError('No onboarding application found.', 404);
  }
  return application;
};

export const getAllApplications = async () => {
  return onboardingRepository.findAll();
};

export const getApplicationById = async (id: string) => {
  const application = await onboardingRepository.findById(id);
  if (!application) {
    throw new AppError('Onboarding application not found.', 404);
  }
  return application;
};

export const reviewApplication = async (id: string, adminId: string, data: OnboardingReviewInput) => {
  const application = await onboardingRepository.findById(id);
  
  if (!application) {
    throw new AppError('Onboarding application not found.', 404);
  }

  if (application.status === OnboardingStatus.APPROVED) {
    throw new AppError('This application has already been approved.', 400);
  }

  const updatedApplication = await onboardingRepository.updateStatus(
    id,
    data.status,
    adminId,
    data.reviewComments
  );

  // If approved, update the user's contractorType and System Role
  if (data.status === OnboardingStatus.APPROVED && updatedApplication) {
    const userUpdatePayload: any = {
      contractorType: updatedApplication.contractorType
    };
    
    if (data.roleId) {
      userUpdatePayload.roleId = data.roleId;
    }
    
    await userRepository.update(updatedApplication.userId.toString(), userUpdatePayload);
  }

  return updatedApplication;
};
