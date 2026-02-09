import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Function to configure Cloudinary (called after env is loaded)
export const configureCloudinary = () => {
  const cloudinaryUrl = process.env.CLOUDINARY_URL || '';
  const urlMatch = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);

  if (!urlMatch) {
    console.error('Invalid CLOUDINARY_URL format. Expected: cloudinary://api_key:api_secret@cloud_name');
    console.error('Received:', cloudinaryUrl);
    return false;
  }

  cloudinary.config({
    cloud_name: urlMatch[3],
    api_key: urlMatch[1],
    api_secret: urlMatch[2],
    secure: true
  });

  console.log('✓ Cloudinary configured with cloud:', urlMatch[3]);
  return true;
};

// Create storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'hotel-uploads',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 2000, height: 2000, crop: 'limit' }]
    };
  }
});

// Create multer upload instance
export const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default cloudinary;
