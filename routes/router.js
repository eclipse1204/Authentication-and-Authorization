const express=require('express');
const router=express.Router();

const {signup,login}=require('../controllers/Auth');
const {auth,isStudent,isAdmin}=require('../middlewares/Auth');

router.post('/signup',signup);
router.post('/login',login);

router.get('/test',auth,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to protected route Test"
    })
})

router.get('/student',auth,isStudent,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to protected route Student"
    })
})

router.get('/admin',auth,isAdmin,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to protected route Admin"
    })
})

module.exports=router;