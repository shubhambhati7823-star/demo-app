import jwt from "jsonwebtoken";
import 'dotenv/config'

const generateAccessToken = (payload)=>{
    const accessToken=jwt.sign(payload,process.env.JWT_SECRET_ACCESS_TOKEN,{
        expiresIn:process.env.JWT_SECRET_ACCESS_EXPIRES_IN
    })
    return accessToken
}

const validateAccessToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET_ACCESS_TOKEN)
}

const generateRefreshToken = (payload)=>{
    const RefreshToken=jwt.sign(payload,process.env.JWT_SECRET_REFRESH_TOKEN,{
        expiresIn:process.env.JWT_SECRET_REFRESH_EXPIRES_IN
    })
    return RefreshToken
}

const validateRefreshToken=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET_REFRESH_TOKEN)
}


export {
    generateAccessToken,
    generateRefreshToken,
    validateAccessToken,
    validateRefreshToken
}