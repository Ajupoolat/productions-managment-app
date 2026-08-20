import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { User, IUser } from '../models/user.model';
import { IRole } from '../models/role.model';
import '../models/permission.model';
import { asyncHandler } from '../utils/asyncHandler';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  try {
    const decoded = verifyAccessToken(token);

    // Fetch user and populate role/permissions (useful for later RBAC)
    const currentUser = await User.findById(decoded.userId).populate({
      path: 'roleId',
      populate: {
        path: 'permissionIds',
        model: 'Permission'
      }
    });

    if (!currentUser) {
      return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    if (currentUser.status !== 'ACTIVE' || !currentUser.isActive) {
      return next(new AppError('This user account is deactivated or suspended.', 401));
    }

    // Attach user to request
    req.user = currentUser;
    next();
  } catch (error: any) {
    console.error('[AUTH DEBUG] Token verification FAILED:', error.name, error.message);
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Your access token has expired! Please refresh it.', 401));
    }
    return next(new AppError('Invalid token. Please log in again!', 401));
  }
});

/**
 * Restrict access to specific roles.
 * Must be used AFTER the `protect` middleware.
 */
export const restrictTo = (role:string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req.user?.roleId as unknown as IRole)?.name;
    
    console.log('the backend userole:', userRole,role)
    if (!userRole || userRole!=role) {
      console.log('the backend roles:', role)
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
