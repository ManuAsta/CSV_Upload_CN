const CSVFile=require("../models/csv_file");

//we need to use csv parser to view a csv file
const csv=require("csv-parser");
const fs=require("fs");
const path=require('path');


module.exports.view=async function(req,res){
   // console.log(req.params.id);

   //get the id first
   let csv_details=[];
   const fileId=req.params.id;
    try{
        //fetch the file from the database
        const csvFile=await CSVFile.findById(fileId);
       // console.log(csvFile);
       // console.log("pwd "+__dirname);
       const filePath=path.join(__dirname,"..",csvFile.csv_file);
       //console.log(filePath);


    //    parsing the csvFile
        fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => csv_details.push(data))
                .on('end', () => {
                //console.log(csv_details);

                //need to pass the headings as well, for a dynamic table
                let keys=[];
                if(csv_details.length>0){
                    keys=Object.keys(csv_details[0]);
                }

                 //console.log(keys);
                let fileName=csvFile.name;
                return res.render("csv",{
                    title:fileName.substring(0,fileName.length-4).toLocaleUpperCase(), //excluding the .csv
                    data:csv_details,
                    headings:keys
                })
        });
    }catch(err){
        console.log("error fetching and showing the file ",err);
        return res.status(500).send(`<h1>Internal Server Error</h1>`)
    }
   
}