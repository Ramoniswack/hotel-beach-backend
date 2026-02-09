import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

export const uploadSingle = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.json({
      success: true,
      url: req.file.path,
      publicId: (req.file as any).filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error });
  }
};

export const uploadMultiple = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const urls = req.files.map((file: any) => ({
      url: file.path,
      publicId: file.filename
    }));

    res.json({
      success: true,
      files: urls
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading files', error });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    await cloudinary.uploader.destroy(publicId);

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting image', error });
  }
};
