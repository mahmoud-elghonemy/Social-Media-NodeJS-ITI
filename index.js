const express= require('express')
const app=express();
const CommentRoute = require("./routes/CommentRoute");
require('./db')

app.use(express.json());


app.use('/posts/', CommentRoute);
app.get('/posts/:id', (req, res)=>{
    console.log("hello")
})
app.listen(8000,()=>{
    console.log("listening to port 8000")
})