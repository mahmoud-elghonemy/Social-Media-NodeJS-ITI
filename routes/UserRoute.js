const express =require('express')
const {promisify} = require('util');
const User=require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const signJwt = promisify(jwt.sign);
const dotenv=require('dotenv')
dotenv.config()
const verify = require('../helper/verify');
const CustomError = require('../helper/customError');
const router=express.Router()
const {validateSignin}=require('../helper/validator')
const cloudinary=require('../cloudinary')
const upload=require('../multer')

router.post('/',upload.single("image"),async(req,res)=>{

   try {
      const result=await cloudinary.uploader.upload(req.file.path)
      res.json(result);
   }catch(err){
    console.log(err)
   }

})


router.post('/signup',upload.single("profile_pic"),async (req,res,next)=>{
    const {firstname,lastname,username,email,age,password,role }=req.body;
    const result=await cloudinary.uploader.upload(req.file.path)

    try{
         const newUser = new User({
             firstname,
             lastname,
             username,
             email,
             age,
             password,
             role,
             profile_pic:result.secure_url,
             cloudinary_id:result.public_id
         });
         await newUser.save();
         res.send(newUser);
     }catch(error)
     {
         console.log(error)
         next(error)
     }
})

router.post('/login',validateSignin,async (req,res,next)=>
{
    
    const {email,password} = req.body;
		const user  = await User.findOne({email});
		if(!user) throw new CustomError('user invalid credentials',400);
		const isMatch = await user.comparePassword(password);
		if(!isMatch) throw new CustomError('password invalid credentials',400);
		// create token 
		const payload = {id:user._id}
		const token = await signJwt(payload,process.env.JWT_SECRET,{expiresIn:'1h'}) // kdlsfjasklfds.
		// send to client
		res.json({
			message:'logged in',
			token,
			user
		})
        
 
   
})

router.get('/profile',
verify.authorizedUser
,
async (req,res,next)=>{
    res.send('profile page');
})


//persmission admin to CRUD user
//get all users
router.get('/',verify.authorizedAdmin,async(req,res,next)=>{
    users=await User.find({});
    res.send(users);
})

router.get('/:id',verify.authorizedAdmin,async (req,res,next)=>{
    user=await User.findById(req.params.id);
    res.send(user);
})


//updates all attributes for user 
router.put('/:id',verify.authorizedAdmin,async(req,res,next)=>{
   let user=await User.findById(req.params.id);
   await cloudinary.uploader.destroy(user.cloudinary_id);

   const result=await cloudinary.uploader.upload(req.file.path);
   const data={
    firstname:req.body.firstname || user.firstname,
    lastname:req.body.lastname || user.lastname,
    username:req.body.username || user.username,
    email:req.body.email || user.email,
    age:req.body.age || user.age,
    password:req.body.password || user.password,
    role:req.body.role || user.role,
    profile_pic:result.secure_url || user.profile_pic ,
    cloudinary_id:result.public_id || user.cloudinary_id
   }
   user=await User.findByIdAndUpdate(req.params.id,data,{new:true});
   res.send('the User is updated')


})

// delete user
//remain check admin or no-->authorize this  
router.delete('/:id',verify.authorizedAdmin,async (req,res,next )=>{
    
    let user=await User.findById(req.params.id);
    await cloudinary.uploader.destroy(user.cloudinary_id);
    await user.remove();
    res.send("User is deleted");

})

//delete all users 
router.delete('/',verify.authorizedAdmin,async (req,res,next)=>{

    await User.deleteMany({});
    res.send("All users are deleted")
})





module.exports=router