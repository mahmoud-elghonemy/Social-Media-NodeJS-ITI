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
    const {email,password }=req.body;
   
    try{
        const Email=await User.findOne({email});
        if(!Email){
         const error=new Error('invaild credentials')
         error.statusCode=400;//bad request
         next(error)
        }
        
 
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