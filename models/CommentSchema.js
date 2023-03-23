const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./UserSchema");
// const Post = require("./PostSchema");


const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }// ,
    // user: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    // post: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Post'
    // }
})

const Comment = mongoose.model('Comment', CommentSchema);
module.exports= Comment;