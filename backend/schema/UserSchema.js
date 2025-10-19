import mongoose from "mongoose";

const schema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:String,

type:{
    type:String,
    enum:['patient','agent',"admin"]
    ,default:"patient"},

isVerified:{
    type:Boolean,
    default:false
},

createdAt:{
    type:Date,
    default:Date.now()
},
})

const userModel = mongoose.model("user",schema)

export default userModel

