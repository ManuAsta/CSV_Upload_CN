const express =require('express');
const router = express.Router();

const homeController=require('../controllers/home_controller'); 

//for home
router.get('/',homeController.home);

//for uploading a csv file
router.post('/upload-csv',homeController.uploadCSV);

//for csv files
router.use('/csv',require('./csv'));
module.exports=router;