const User=require('../models/UserSchema')
const jwt=require('jsonwebtoken');
const {promisify}=require('util')
const verifyJwt=promisify(jwt.verify)

module.exports=async (req,res,next)=>{
    console.log(req.headers.authorization)
//extract token from headers
//verify the token (secret)
//find user by id 
//attach  user to request body
//middleware to check if user exist and authroized
try
{
const token =req.headers.authorization;
if(!token)
{
    const error=new Error('unauthorized');
    error.statusCode=401;
    return next(error)

}
const {id}=await verifyJwt(token,"mySecret")
const user=await User.findById(id)
if(!user)
{
    const error=new Error('unauthorized');
    error.statusCode=401;
    return next(error)

}
req.user=user;
next();
}catch(err)
{
console.log(err)
next(err)

}
}