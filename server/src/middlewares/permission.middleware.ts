import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { IPermission } from '../models/permission.model';
import { IRole } from '../models/role.model';


export const requirePermission = (...requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('You must be logged in to access this resource.', 401);
    }

    const role = req.user.roleId as unknown as IRole;
    if (!role) {
      throw new AppError('You do not have a role assigned. Contact an administrator.', 403);
    }

    const userPermissions: string[] = (role.permissionIds as unknown as IPermission[]).map(
      (permission) => permission.key
    );

    const hasAllPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasAllPermissions) {
      throw new AppError('You do not have permission to perform this action.', 403);
    }

    next();
  };
};
