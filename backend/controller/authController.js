import userModel from "../schema/UserSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import otpModel from "../schema/Otp.js"
import { SignupEmailTemplate } from "../templates/emailTemplate.js"



export const signUpController = async (req, res) => {
  try {
    const body = req.body;
    console.log("Body Data:", body);

    // Check if email already exists
    const isExists = await userModel.findOne({ email: body.email });
    console.log("isExists", isExists);

    if (isExists) {
      return res.json({
        message: "Email already exists",
        status: false,
        data: null,
      });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(body.password, 10);
    console.log("hashpassword", hashpassword);

    // Map body to user object
    const userObj = {
      ...body,
      password: hashpassword,
    };
    console.log("UserObj:", userObj);

    // Save user in MongoDB
    const response = await userModel.create(userObj);
    console.log("User saved in MongoDB:", response);
console.log(process.env.EMAIL, process.env.APP_PASSWORD)

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD, // 👈 Gmail app password hona chahiye (16 chars)
      },
    });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 1 * 60 * 1000);

    const mailOptions = {
      from: process.env.EMAIL,
      to: userObj.email,
      subject: "User Signup",
      html: SignupEmailTemplate(userObj, otp),
    };

    try {
      const userEmail = await transporter.sendMail(mailOptions);
      console.log("Email sent:", userEmail.response);

      // Save OTP in DB
      await otpModel.create({
        otp,
        email: userObj.email,
        expiresAt,
      });
    } catch (mailErr) {
      console.error("Email Error:", mailErr);
      return res.json({
        message: "User saved but email not sent",
        status: false,
        data: response,
      });
    }

    res.json({
      message: "USER SUCCESSFULLY SIGN UP",
      status: true,
      data: response,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.json({
      message: error.message,
      status: false,
    });
  }
};


export const loginController = async (req,res) => {
    const body = req.body

    const user = await userModel.findOne({email:body.email})
    if (!user) {
      return  res.json({
            message:"INVALID EMAIL OR PASSWORD",
            data:null,
            status:false
        })
    }
    const userPassword = await bcrypt.compare(body.password,user.password)
if (!userPassword) {
     return  res.json({
            message:"INVALID EMAIL OR PASSWORrD",
            data:null,
            status:false
        })
}

const PRIVATE_KEY = process.env.jwtPrivateKey
const token =jwt.sign({id:user._id,email: user.email,
    type: user.type},PRIVATE_KEY,{

})
console.log("token",token)
    res.json({
        message:"USER LOGIN ",
        data:user,
        status:true,
        token
    })
}

export const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("OTP Body:", req.body);

    const otpRecord = await otpModel.findOne({
      email,
      otp,
      isUsed: false,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP",
        status: false,
      });
    }

    // ✅ Expiry check
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP has expired",
        status: false,
      });
    }

    // ✅ Mark as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // ✅ Update user verification
    await userModel.findOneAndUpdate(
      { email },
      { isVerified: true }
    );

    return res.json({
      message: "Account verified",
      status: true,
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};


export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email", email);

    const userObj = await otpModel.findOne({ email });

    if (!userObj) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      });
    }

    // Expire old unused OTPs
    await otpModel.updateMany({ email, isUsed: false }, { isUsed: true });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Send email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: userObj.email,
      subject: "User Signup - OTP Resent",
      html: SignupEmailTemplate(userObj, otp),
    };

    await transporter.sendMail(mailOptions);

    // Save new OTP
    await otpModel.create({
      email,
      otp,
      expiresAt,
      isUsed: false,
    });

    return res.json({
      message: "OTP resent successfully",
      status: true,
    });

  } catch (error) {
    console.error("OTP resend error:", error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

