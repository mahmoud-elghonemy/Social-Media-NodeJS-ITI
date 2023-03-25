const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./UserSchema");
 const Post = require("./PostSchema");


const ReviewSchema = new Schema({
    review: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
     user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User'
    }
    ,
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
})

const Review = mongoose.model('Review', ReviewSchema);
module.exports= Review;