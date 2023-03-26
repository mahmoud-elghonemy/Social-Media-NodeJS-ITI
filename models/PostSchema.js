const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./UserSchema");



const PostSchema = new Schema({
    post: {
        type: String,
        required: true
    } 
    ,
    User: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Post = mongoose.model('Post', PostSchema);
module.exports= Post;