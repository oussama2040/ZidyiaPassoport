import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

const uploadImage = async (imageBuffer) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error.message);
            reject(error.message);
          } else {
            resolve(result.secure_url);
            console.log('Image uploaded to Cloudinary:', result);
            console.log(result)
          }
        }
      ).end(imageBuffer);
    });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw new Error(`Error uploading image: ${error.message}`);
  }
};

const uploadImageInFolder = async (imageBuffer, folderName) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: folderName }, // Specify the folder name
        (error, result) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(result.secure_url);
            console.log(result);
          }
        }
      ).end(imageBuffer);
    });
  } catch (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
};


const uploadMultipleImages = async (imageBuffers) => {
  try {
    const uploadPromises = imageBuffers.map((imageBuffer) => {
      return uploadImage(imageBuffer);
    });

    return Promise.all(uploadPromises);
  } catch (error) {
    throw new Error(`Error uploading images: ${error.message}`);
  }
};

export  { uploadImage, uploadMultipleImages, uploadImageInFolder };
export default upload
