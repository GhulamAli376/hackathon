import { uploadImageController } from "../controllers/imageController.js";
import authMiddleWare from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import express from "express";

const uploadImage = express.Router();

uploadImage.post(
  "/upload",
  [authMiddleWare, upload.any("image")],
  uploadImageController
);

export default uploadImage;
