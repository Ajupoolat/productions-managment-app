import multer from 'multer';
import cloudinary from '../configs/cloudinary.config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { AppError } from '../utils/AppError';
import { Request, Response, NextFunction } from 'express';

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Generate a secure, unique folder path for the user
    const userId = req.user ? req.user._id.toString() : 'anonymous';
    return {
      folder: `tendagon/onboarding/${userId}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
      public_id: `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '')}`,
    };
  },
});

// File filter for extra security (validates MIME type before uploading)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError('Unsupported file type. Please upload PDF, JPG/JPEG or PNG.', 400));
  }
};

// Create Multer upload instance
export const uploadDocuments = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB limit
    files: 2, // Maximum 2 files
  },
});


// Middleware to parse JSON payload sent as 'data' in multipart/form-data
export const parseFormData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.data && typeof req.body.data === 'string') {
    try {
      req.body = JSON.parse(req.body.data);
    } catch (err) {
      return next(new AppError('Invalid JSON payload in form data', 400));
    }
  }
  next();
};
