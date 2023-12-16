const express =require('express');
const router = express.Router();
const csvController=require("../controllers/csv_controller");

//for viewing a csv file 
router.get("/:id",csvController.view);
module.exports=router;