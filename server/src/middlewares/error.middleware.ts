import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import env from '../configs/env.config';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value entered';
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map((val: any) => val.message);
    message = `Invalid input data. ${errors.join('. ')}`;
  }

  // Zod validation error
  if (err.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation failed';
    // We can also attach the specific issues if needed
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again!';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your token has expired! Please log in again.';
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
