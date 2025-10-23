import multer from "multer";

// Store files in memory (you can later save them to disk or cloud)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

export default upload;
