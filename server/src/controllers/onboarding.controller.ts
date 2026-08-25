import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as onboardingService from '../services/onboarding.service';

export const submitApplication = asyncHandler(async (req: Request, res: Response) => {
  const application = await onboardingService.submitApplication(
    req.user!._id.toString(),
    req.body,
    req.files as Express.Multer.File[]
  );
  
  res.status(201).json({
    success: true,
    message: 'Onboarding application submitted successfully',
    data: { application },
  });
});

export const getMyApplication = asyncHandler(async (req: Request, res: Response) => {
  const application = await onboardingService.getMyApplication(req.user!._id.toString());
  
  res.status(200).json({
    success: true,
    data: { application },
  });
});

export const getAllApplications = asyncHandler(async (req: Request, res: Response) => {
  const { data: applications, meta } = await onboardingService.getAllApplications(req.query);
  
  res.status(200).json({
    success: true,
    data: { applications },
    meta
  });
});

export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {
  const application = await onboardingService.getApplicationById(req.params.id as string);
  
  res.status(200).json({
    success: true,
    data: { application },
  });
});

export const reviewApplication = asyncHandler(async (req: Request, res: Response) => {
  const application = await onboardingService.reviewApplication(
    req.params.id as string,
    req.user!._id.toString(),
    req.body
  );
  
  res.status(200).json({
    success: true,
    message: `Application ${req.body.status.toLowerCase()} successfully`,
    data: { application },
  });
});
