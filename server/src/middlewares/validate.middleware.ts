import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError';
import { ZodError, ZodSchema } from 'zod';

export const validateInputs = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      console.log(' the data from client :',req.body)
      const validatedData = schema.parse(req.body);
      console.log('the validated data :',validatedData)
      req.body = validatedData;

      console.log(`Inputs: ${JSON.stringify(req.body)}`);

      next();
    } catch (error) {
      console.log('the error why:',error)
      next(error);
    }
  };
};

export const validateObjectId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName] as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Invalid ID format', 400);
    }

    next();
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.locals.validateQuery = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.flatten(),
        });
        return;
      }

      next(error);
    }
  };
};
