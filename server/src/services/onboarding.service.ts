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

  const documents = await documentRepository.findByOnboardingId(application._id as Types.ObjectId);
  
  // Convert Mongoose document to plain object to attach properties
  const appObj = application.toObject();
  appObj.documents = documents;
  
  return appObj;
};

export const getAllApplications = async () => {
  return onboardingRepository.findAll();
};

export const getApplicationById = async (id: string) => {
  const application = await onboardingRepository.findById(id);
  if (!application) {
    throw new AppError('Onboarding application not found.', 404);
  }

  const documents = await documentRepository.findByOnboardingId(application._id as Types.ObjectId);
  
  const appObj = application.toObject();
  appObj.documents = documents;

  return appObj;
};

export const reviewApplication = async (id: string, adminId: string, data: OnboardingReviewInput) => {
  const application = await onboardingRepository.findById(id);
  
  if (!application) {
    throw new AppError('Onboarding application not found.', 404);
  }

  if (data.status === OnboardingStatus.APPROVED && !data.roleId) {
    throw new AppError('A role must be assigned to approve the application.', 400);
  }

  const updatedApplication = await onboardingRepository.updateStatus(
    id,
    data.status,
    adminId,
    data.reviewComments
  );

  if (updatedApplication) {
    if (data.status === OnboardingStatus.APPROVED) {
      // If approved, update the user's contractorType and System Role
      await userRepository.update(updatedApplication.userId.toString(), {
        contractorType: updatedApplication.contractorType,
        roleId: data.roleId as unknown as Types.ObjectId
      });
    } else if (data.status === OnboardingStatus.CHANGES_REQUESTED || data.status === OnboardingStatus.REJECTED) {
      // If rejected or changes requested, clear their role so they lose access
      await userRepository.update(updatedApplication.userId.toString(), {
        roleId: null as unknown as Types.ObjectId
      });
    }
  }

  return updatedApplication;
};
