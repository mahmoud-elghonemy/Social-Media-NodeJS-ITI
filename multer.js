const multer=require('multer')
const path=require('path')
// const storage=multer.diskStorage({

//     destination:function(req,file,cb){
//        cb(null,'/uploads')
//     },
//     filename:function (req,file,cb)
//     {
//         cb(null,new Data().toIOString()+'-'+file.originalname)
//     }

// })

// //file validation
// const fileFilter=(req,file,cb)=>{
//     if(file.mimetype==='image/jpeg' || file.mimetype==='image/png')
//     {
//         cb(null,true)
//     }else
//     {
//         //orevent to upload
//         cb({message:'Unsupported file format'},false)
//     }
// }

// const upload=multer({
//     storage:storage,
//     limits:{fileSize:1024*1024},
//     fileFilter:fileFilter

// })




module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext=path.extname(file.originalname); 
        if(ext !== '.jpg' && ext !=='.jpeg' && ext !=='.png'){
            cb(new Error('file type is not supported'),false);
            return;
        }
        cb(null,true);
    }
});

