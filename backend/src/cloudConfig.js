import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


cloudinaryV2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    params: {
        folder: 'pdfSolutions',
    },
});

// const dp = new CloudinaryStorage({
//     cloudinary: cloudinaryV2,
//     params: {
//         folder: 'profilePic',
//     },
// });

// // Configure Multer storage with Cloudinary for video uploads
// const videoStorage = new CloudinaryStorage({
//     cloudinary: cloudinaryV2,
//     params: {
//       folder: 'videoSolutions',
//       format: 'mp4',
//       resource_type: 'video', // Important for video uploads
//     },
//   });

export { cloudinaryV2 as cloudinary, storage };