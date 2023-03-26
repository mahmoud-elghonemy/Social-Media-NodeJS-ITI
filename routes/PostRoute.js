const express = require("express");
const router = express.Router();
const Post = require('../models/PostSchema');
const verify = require('../helper/verify');
//get all posts 
router.get('/',verify.authorizedCreator,async (req,res,next)=>{
    posts=await Post.find({});
    res.send(posts);
})


//get one post
router.get('/:id',verify.authorizedCreator,async (req,res,next)=>{
    oldpost=await Post.findById(req.params.id);
    res.send(oldpost);
})

//create post 
router.post('/',verify.authorizedCreator,async (req,res,next)=>{
    const post = await Post.create({
		post:req.body.post,
		User: req.user._id
	})
    await post.save();
	res.send(post)
})

//edit  post 
router.patch('/:id',verify.authorizedCreator,async (req,res,next)=>{
    const updatepost=req.body.post;
    const upPost =await Post.findByIdAndUpdate(req.params.id,{post:updatepost},{new: true});
    res.send(upPost);
   

})

//delete this post
router.delete('/:id',verify.unauthorizedUser,async (req,res,next)=>{
    await Post.findByIdAndDelete(req.params.id,{new: true});
    res.send("post is deleted");

})

//delete all posts 
router.delete('/',verify.authorizedAdmin,async (req,res,next)=>{
    await Post.deleteMany({});
    res.send("All posts are deleted")
})



module.exports = router;