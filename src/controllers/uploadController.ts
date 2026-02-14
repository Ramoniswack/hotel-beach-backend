import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';

export const uploadSingle = async (req: Request, res: Response) => {
  try {
    console.log('=== Upload Request Debug ===');
    console.log('Headers:', req.headers);
    console.log('User:', (req as any).user);
    console.log('File:', req.file);
    console.log('Body:', req.body);
    
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded',
        debug: {
          hasFile: !!req.file,
          contentType: req.headers['content-type']
        }
      });
    }

    console.log('File uploaded successfully:', req.file.path);
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      url: req.file.path,
      publicId: (req.file as any).filename,
      data: {
        url: req.file.path,
        publicId: (req.file as any).filename
      }
    });
  } catch (error: any) {
    console.error('=== Upload Error ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      success: false,
      message: 'Error uploading file', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const uploadMultiple = async (req: Request, res: Response) => {
  try {
    console.log('Multiple upload request received');
    console.log('Files:', req.files);
    
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const urls = req.files.map((file: any) => ({
      url: file.path,
      publicId: file.filename
    }));

    console.log('Files uploaded successfully:', urls.length);

    res.json({
      success: true,
      files: urls
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Error uploading files', 
      error: error.message,
      stack: error.stack 
    });
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
  } catch (error: any) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: 'Error deleting image', 
      error: error.message 
    });
  }
};
