import express from 'express';
import {  signUpController } from '../controller/authController.js';
import rateLimit from 'express-rate-limit'
const authRouter = express.Router()



authRouter.post("/signup",signUpController)

// authRouter.post("/login",limiter,loginController)

// authRouter.post("/otp-verification",otpVerification)
// authRouter.post("/otp-resend",resendOtp)
export default authRouter
