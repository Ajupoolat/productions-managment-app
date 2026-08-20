import { Request, Response, NextFunction } from 'express';
import * as roleService from '../services/role.service';
import { AppError } from '../utils/AppError';

export const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await roleService.getAllRoles();

    res.status(200).json({
      status: 'success',
      data: {
        roles,
      },
    });
  } catch (error) {
    next(new AppError('Failed to fetch roles', 500));
  }
};
