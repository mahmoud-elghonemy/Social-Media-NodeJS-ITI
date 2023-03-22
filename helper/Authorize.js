const Comment = require('../models/CommentSchema');
const User = require('../models/UserSchema');
//const Post = require('../models/PostSchema');

const authorizedUser = async (req,res,next)=>{
    const comment =  await Comment.find({_id: req.params.comment_id});
    // return error if the comment is not found
    if(!comment){
        const error = new Error("Comment Not Found");
        error.statusCode = 404;
        return next(error);
    }

    // autherize if the user is an admin or the comment creator
    if(req.user.role == "admin" || comment.user == req.user._id){
        return next();  
    }

    // return error if it's another user
    if(comment.user != req.user._id){
        const error = new Error("Not authorized to do this action");
        error.statusCode = 403;
        return next(error);
    }

}

module.exports = {
    authorizedUser
}
