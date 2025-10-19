import express from 'express';
import {  loginController, otpVerification, resendOtp, signUpController } from '../controller/authController.js';
import rateLimit from 'express-rate-limit'
const authRouter = express.Router()

const limiter = rateLimit({
windowMs:1*60*1000,
max:5,
message: 'Too many requests from this IP, please try again later.',
})

authRouter.post("/signup",signUpController)

authRouter.post("/login",limiter,loginController)

authRouter.post("/otp-verification",otpVerification)
authRouter.post("/otp-resend",resendOtp)
export default authRouter
