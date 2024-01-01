const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async(req,res,next)=>{
    try{
        const token=req.body.token || req.cookies.token;
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found"
            })
        }
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user=payload;
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"Token invalid"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong while verifying the user"
        })
    }
}

exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.role!=="Student")
        {
            return res.status(400).json({
                success:false,
                message:"User is not a student"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.role!=="Admin")
        {
            return res.status(400).json({
                success:false,
                message:"User is not a Admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"User role is not matching"
        })
    }
}