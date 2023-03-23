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
  
UserSchema.pre('save',async function(next){
	const userDocument = this;
	if(userDocument.isModified('password')){
		const hashedPassword = await bcrypt.hash(userDocument.password,saltRound);
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
