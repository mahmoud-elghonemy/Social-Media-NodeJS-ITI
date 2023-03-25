const express =require('express')
const {promisify} = require('util');
const User=require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const signJwt = promisify(jwt.sign);
// const {jwtSecret} = require('../config')
// const validator = require('../helper/validator');
const verify = require('../helper/verify');
const CustomError = require('../helper/customError');
const router=express.Router()
const {validateSignin}=require('../helper/validator')


router.post('/signup',async (req,res,next)=>{
    const {firstname,lastname,username,email,age,password }=req.body;
   
    try{
         const newUser = new User({
             firstname,
             lastname,
             username,
             email,
             age,
             password
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
		const token = await signJwt(payload,"mySecret",{expiresIn:'1h'}) // kdlsfjasklfds.
		// send to client
		res.json({
			message:'logged in',
			token,
			user
		})
        
 
   
})

router.get('/profile',
verify
,
async (req,res,next)=>{
    res.send('profile page');
})


//persmission admin to CRUD user
//get all users
router.get('/',async(req,res,next)=>{
    users=await User.find({});
    res.send(users);
})

router.get('/:id',async (req,res,next)=>{
    user=await User.findById(req.params.id);
    res.send(user);
})


//update attribute in user 
router.patch('/:id', async(req,res,next)=>{

})
//updates all attributes for user 
router.put('/:id',async(req,res,next)=>{

})

// delete user
//remain check admin or no-->authorize this  
router.delete('/:id',async (req,res,next )=>{
    await User.findByIdAndDelete(req.params.id,{new: true});
    res.send("User is deleted");

})

//delete all users 
router.delete('/',async (req,res,next)=>{

    await User.deleteMany({});
    res.send("All users are deleted")
})








module.exports=router