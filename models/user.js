const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["Visitor","Student","Admin"]
    }
});

module.exports=mongoose.model("User",UserSchema);