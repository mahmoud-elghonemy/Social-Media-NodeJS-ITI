const mongoose= require("mongoose")
const bcrypt =require('bcrypt')
const _ = require('lodash'); 
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
        //  unique:true

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
    },role: {
        type: String,
        enum: ['admin', 'creator', 'user'],
        default: 'user'
      }



  },{
	toJSON:{
		transform: (doc,ret)=>{
			const dataToReturn = _.pick(ret,['_id','email','username','age','role'])
			return dataToReturn;
		}
	}});
  
UserSchema.pre('save',async function(next){
	const userDocument = this;
	if(userDocument.isModified('password')){
		const hashedPassword = await bcrypt.hash(userDocument.password,14);
		userDocument.password = hashedPassword;
	}
	next();
})
UserSchema.methods.comparePassword = function (password){
	const userDocument = this;
	return bcrypt.compare(password,userDocument.password)
}
// userSchema.statics.
const User = mongoose.model('User',UserSchema);
module.exports = mongoose.model('User', UserSchema);
