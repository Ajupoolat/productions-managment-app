import { OnboardingApplication, IOnboardingApplication } from '../models/onboarding.model';
import { Types } from 'mongoose';
import { ApiFeatures } from '../utils/apiFeatures';

export const create = async (data: Partial<IOnboardingApplication>): Promise<IOnboardingApplication> => {
  return OnboardingApplication.create(data);
};

export const findByUserId = async (userId: string | Types.ObjectId): Promise<IOnboardingApplication | null> => {
  return OnboardingApplication.findOne({ userId });
};

export const findById = async (id: string | Types.ObjectId): Promise<IOnboardingApplication | null> => {
  return OnboardingApplication.findById(id).populate('userId', 'fullName email status');
};

export const updateByUserId = async (
  userId: string | Types.ObjectId,
  data: Partial<IOnboardingApplication>
): Promise<IOnboardingApplication | null> => {
  return OnboardingApplication.findOneAndUpdate(
    { userId },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const findAll = async (queryString: any = {}): Promise<{ data: IOnboardingApplication[], meta: any }> => {
  const query = OnboardingApplication.find().populate('userId', 'fullName email status');
  
  const features = new ApiFeatures(query, queryString)
    .filter()
    .search(['personalInformation.fullName', 'personalInformation.phone', 'contractorType'])
    .sort();

  await features.countTotal();
  features.paginate();

  const data = await features.query;
  const meta = features.getPaginationMeta();

  return { data, meta };
};

export const updateStatus = async (
  id: string | Types.ObjectId,
  status: string,
  reviewedBy: string | Types.ObjectId,
  reviewComments?: string
): Promise<IOnboardingApplication | null> => {
  return OnboardingApplication.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
        reviewedBy,
        reviewedAt: new Date(),
        reviewComments,
      },
    },
    { new: true }
  );
};
