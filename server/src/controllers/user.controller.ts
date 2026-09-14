import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';

export const getAvailableTalent = asyncHandler(async (req: Request, res: Response) => {
  // Get the role from the query parameter (e.g., ?type=CAST)
  const roleType = req.query.type as 'CAST' | 'CREW';
  
  if (!roleType || !['CAST', 'CREW'].includes(roleType)) {
    throw new AppError('Invalid talent type. Use CAST or CREW.',400);
  }

  const talent = await userService.getTalentUsers(roleType);

  res.status(200).json({
    success: true,
    data: { users: talent },
  });
});
