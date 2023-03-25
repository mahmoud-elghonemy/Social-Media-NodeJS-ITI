const express = require("express");
const router = express.Router();
const Comment = require('../models/CommentSchema');
const { authorizedUser } = require("../helper/Authorize");


router.post("/:post_id/comments", async(req,res)=>{
    const comment = await Comment.create({
        comment: req.body.comment,
    //     user: req.user._id,
        post: req.params.post_id
    })
    await comment.save();
    res.send(comment);
})

router.get('/:post_id/comments', async(req,res)=>{
    const comments = await Comment.find({post: req.params.post_id});
    // const comments = await Comment.find({});
    res.send(comments);
})

router.patch('/:post_id/comments/:comment_id' ,async (req,res,next)=>{
    const updatedComment = req.body.comment;

    const comment = await Comment.findByIdAndUpdate(
        req.params.comment_id,
        { comment: updatedComment },
        { new: true }
        );
        res.json(comment);
})


router.delete("/:post_id/comments/:comment_id", async(req,res,next)=>{
    const comment = await Comment.findByIdAndDelete(req.params.comment_id);
    res.json({ message: 'Comment deleted successfully' });
})


module.exports = router;