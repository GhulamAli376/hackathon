import multer from "multer";

// Memory storage (file will be stored in RAM as a Buffer)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
});

export default upload;