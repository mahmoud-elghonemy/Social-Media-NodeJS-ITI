const mongoose = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log("connected to database"))
.catch((err)=> {
    console.log(err);
    process.exit
})

