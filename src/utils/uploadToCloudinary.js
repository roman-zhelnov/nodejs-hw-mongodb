import cloudinary from 'cloudinary';

cloudinary.v2.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadToCloudinary = (filePath) => {
  return cloudinary.v2.uploader.upload(filePath);
};
