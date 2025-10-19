import mongoose from "mongoose"

export const dbConnection =()=>{
    try {
        
        const uri = process.env.MONGODB_URI
        mongoose.connect(uri) .then(() => console.log(`🚀 mongoDB connected`))
            .catch((err) => console.log(`💥MongoDB ERROR: ${err.message}`))
    } catch (error) {
          console.log("error", error.message)
    }
}
