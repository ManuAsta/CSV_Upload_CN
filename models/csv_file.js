const mongoose = require('mongoose');
const path=require('path');
const multer= require('multer');
const CSV_PATH= path.join('/uploads/csv_files');

const csvFileSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    csv_file:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const storage= multer.diskStorage({
    destination: function(req,file,cb){
        // console.log("pwd is ",__dirname);
        cb(null,path.join(__dirname,"..",CSV_PATH));
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})


//so that it can be used elsewhre
csvFileSchema.statics.upload = multer({ storage: storage }).single('csv-file');
csvFileSchema.statics.csvPath=CSV_PATH;

const CSVFile=mongoose.model('CSVFile',csvFileSchema);
module.exports=CSVFile;