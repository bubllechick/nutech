const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_image',
        allowed_formats: ['jpeg', 'png'],
    },
});

multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 }, });

exports.upload = async (data) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                public_id: `profile_images/${Date.now()}-${data.name}`,
                folder: 'profile_image',
                mime_type: data.mimetype,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(data.data);
    });
}