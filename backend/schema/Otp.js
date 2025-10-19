import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email:String,
    otp:String,
    isUsed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
      expiresAt: {
    type: Date,
    required: true,
  },
})

const otpModel = mongoose.model("otp",otpSchema)

export default otpModel