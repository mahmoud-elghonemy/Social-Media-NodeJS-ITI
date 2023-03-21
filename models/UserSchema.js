const mongoose= require("mongoose")


const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true
       
    },lastname:{
        type:String,
        required:true
    }
    ,username: { 
        type: String,
         required: true,
         minLength:3,
         maxLength: 20,
         unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    }
    ,
    age: { type: Number
    },
    password:{
        type:String,
        required: true
    }
   
  });

module.exports = mongoose.model('User', UserSchema);