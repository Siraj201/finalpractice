// import ('dotenv').config();

// import  cloudinary  from 'cloudinary';
// import  { CloudinaryStorage } from 'multer-storage-cloudinary';
// import express from 'express';
// import multer from 'multer';

// const app = express();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'wanderlust-dev',
//     allowed_formats: ['png', 'jpeg', 'jpg'],
//     public_id: (req, file) => 'computed-filename-using-request',
//   },
// });

// const parser = multer({ storage: storage });

// export { parser };

