const express= require('express')
const app=express()
require('./db')


app.listen(8000,()=>{
    console.log("listening to port 8000")
})