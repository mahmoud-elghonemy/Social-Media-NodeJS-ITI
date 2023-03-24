const express =require('express')
const {promisify} = require('util');
const User=require('../models/UserSchema')
const jwt = require('jsonwebtoken');
const signJwt = promisify(jwt.sign);
const validator = require('../helper/validator');
const verify = require('../helper/verify');
const CustomError = require('../helper/customError');
const router=express.Router()

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

router.post('/login',validator.validateSignin,async (req,res,next)=>
{
    
    const {email,password} = req.body;
		const user  = await User.findOne({email});
		if(!user) throw new CustomError('invalid credentials',400);
		const isMatch = await user.comparePassword(password);
		if(!isMatch) throw new CustomError('invalid credentials',400);
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

router.get('/',async(req,res,next)=>{
    
})
//update attribute in user 
router.patch('/:id', async(req,res,next)=>{

})
//updates all attributes for user 
router.put('/:id',async(req,res,next)=>{

})

// delete user
router.delete('/:id',(req,res)=>{})






module.exports=router