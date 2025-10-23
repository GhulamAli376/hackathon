import express from 'express';
import { addFamily, addReport, getaddFamily, getReports } from '../controller/userController.js';
import upload from "../middleware/multer.js";
const userRouter = express.Router()



userRouter.post("/addfamily",addFamily)
userRouter.get("/getfamily",getaddFamily)
userRouter.post("/addreport", upload.any("files"),addReport);
userRouter.get("/get-report/:memberId", getReports);
userRouter.get("/ping", (req, res) => {
  res.send("pong ✅ from userRouter");
});

export default userRouter
