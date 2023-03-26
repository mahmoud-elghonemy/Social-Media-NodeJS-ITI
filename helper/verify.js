const User=require('../models/UserSchema')
const jwt=require('jsonwebtoken');
const {promisify}=require('util')
const verifyJwt=promisify(jwt.verify)
const Post = require("../models/PostSchema");
const Comment = require("../models/CommentSchema");


const authorizedUser =async (req,res,next)=>{
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


const authorizedCreator =async (req,res,next)=>{
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
    const error=new Error('unauthorized User');
    error.statusCode=401;
    return next(error)

}

if(user.role!='creator'){
    const error=new Error('unauthorized,this action is specific for creator only');
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






const authorizedAdmin =async (req,res,next)=>{
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

if(user.role!='admin'){
    const error=new Error('unauthorized,this action is specific for admin only');
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

const unauthorizedUser = async (req,res,next)=>{
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

///

const post = await Post.find({_id: req.params.id});

if(user.role == "admin" || id == post.User){
    next();
}else{
    const error=new Error('unauthorized,this action is specific for admin and creators only');
    error.statusCode=401;
    return next(error);
}


req.user=user;
next();
}catch(err)
{
console.log(err)
next(err)

}
}



const userComment = async (req,res,next)=>{
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

///

const comment = await Comment.findOne({_id: req.params.comment_id});

// console.log(comment);
// console.log(id);
// console.log(comment.user.toString());

if(id == comment.user.toString()){
    next();
}else{
    const error=new Error('unauthorized,this action is specific for the comment user only');
    error.statusCode=401;
    return next(error);
}


req.user=user;
next();
}catch(err)
{
console.log(err)
next(err)

}
}





module.exports = {
    authorizedUser,
    authorizedCreator,
    authorizedAdmin,
    unauthorizedUser,
    userComment
}
