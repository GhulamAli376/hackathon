import { cloudinaryUploader } from "../config/cloudinary.js";

export const uploadImageController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No file uploaded", status: false });
    }

    const fileBuffer = req.files[0].buffer;

    // Cloudinary upload_stream
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinaryUploader.upload_stream(
        { folder: "uploads" }, // optional folder in Cloudinary
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(fileBuffer); // send buffer to Cloudinary
    });

    const imageRes = await uploadPromise;

    res.json({
      message: "Image Uploaded",
      url: imageRes.secure_url,
      status: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};
