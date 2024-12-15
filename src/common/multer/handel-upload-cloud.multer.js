import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
// Configuration
cloudinary.config({
  cloud_name: "dy7e0w5bq",
  api_key: "638168749426376",
  api_secret: process.env.CLOUDINARY_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    // format: async (req, file) => "png", // supports promises as well
    // public_id: (req, file) => "computed-filename-using-request",
  },
});

export const uploadCloud = multer({ storage: storage });
