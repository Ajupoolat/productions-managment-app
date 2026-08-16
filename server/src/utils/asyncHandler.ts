import { Request, Response, NextFunction } from 'express';

/**
 * Wraps an async route handler so that any rejected promise
 * is automatically forwarded to Express's error middleware via next().
 * This eliminates repetitive try/catch blocks in every controller.
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
