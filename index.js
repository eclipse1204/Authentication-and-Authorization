const express=require('express');
const app=express();
const dbConnect=require('./config/database');
require('dotenv').config();
const router=require('./routes/router');
const cookieParser = require('cookie-parser');
const PORT=process.env.PORT||4000;

dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',router);


app.listen(PORT,()=>{
    console.log("App is running on Port "+PORT);
})