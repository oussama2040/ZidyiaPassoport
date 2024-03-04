import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Cloudinary upload image
const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: 'auto',
        });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}


// Cloudinary remove image
const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}


// Cloudinary remove multiple image
const cloudinaryRemoveMultipleImage = async (PublicIds) => {
    try {
        const result = await cloudinary.v2.api.delete_resources(PublicIds);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}
export { cloudinaryRemoveImage,cloudinaryUploadImage,    cloudinaryRemoveMultipleImage
};

// module.exports = {
//     cloudinaryUploadImage,
//     cloudinaryRemoveImage,
// }
