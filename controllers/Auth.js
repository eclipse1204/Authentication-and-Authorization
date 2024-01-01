const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

require('dotenv').config();

exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role)
        {
            return res.status(400).json({
                success:false,
                message:"Credentials are not completely filled"
            })
        }
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }
        const user=await User.create({name,email,password:hashedPassword,role});
        return res.status(200).json({
            success:true,
            message:"Sign up successful"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in Sign up"
        })
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Credentials are not completely filled"
            })
        }
        let existingUser=await User.findOne({email});
        if(!existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User doesn't exists"
            })
        }
        const validPassword=await bcrypt.compare(password,existingUser.password);
        if(!validPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Wrong Password"
            })
        }

        const payload={
            email:existingUser.email,
            id:existingUser._id,
            role:existingUser.role,
        }

        let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"});
        
        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        existingUser=existingUser.toObject();
        existingUser.token=token;
        existingUser.password=undefined;
        return res.cookie('token',token,options).status(200).json({
            success:true,
            token,
            existingUser,
            message:"User logged in successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in Login"
        })
    }
}