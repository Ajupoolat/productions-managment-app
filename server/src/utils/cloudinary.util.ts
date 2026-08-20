import cloudinary from '../configs/cloudinary.config';
import { AppError } from './AppError';


export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok' || result.result === 'not found') {
      return true;
    }
    
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, result);
    return false;
  } catch (error) {
    console.error(`Error deleting Cloudinary asset ${publicId}:`, error);
    throw new AppError('Failed to delete associated files from cloud storage.', 500);
  }
};
