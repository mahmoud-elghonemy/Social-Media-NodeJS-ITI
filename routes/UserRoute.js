const express =require('express')
const User=require('../models/UserSchema')
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

router.post('/login',async (req,res)=>
{
    try{
    const {email,password} = req.body;
		const user  = await User.findOne({email});
		if(!user) throw new CustomError('invalid credentials',400);
		const isMatch = await user.comparePassword(password);
		if(!isMatch) throw new CustomError('invalid credentials',400);
		// create token 
		const payload = {id:user._id}
		const token = await signJwt(payload,jwtSecret,{expiresIn:'1h'}) // kdlsfjasklfds.
		// send to client
		res.json({
			message:'logged in',
			token,
			user
		})
        
 
     }catch(error)
     {
         console.log(error)
         next(error)
     }
})

router.get('/profile',
async (req,res,next)=>{
    res.send('profile page');
})

module.exports=router