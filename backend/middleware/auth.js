import jwt from "jsonwebtoken"
const authMiddleWare =async (req,res,next)=>{
try {
    const response = await req.headers.authorization?.split(" ")[1]

    const isVarified =await jwt.verify(response,process.env.jwtPrivateKey);

    if (isVarified?.id) {
        req.user = isVarified
        next()
    } else {
        res.json({
        message:"unAuthorized Person"
    })
    }
} catch (error) {
    res.json({
        message:"unAuthorized Person"
    })
}
}
export default authMiddleWare