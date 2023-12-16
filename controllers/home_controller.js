const CSVFile = require('../models/csv_file');
const path=require('path');
const fs=require('fs');

module.exports.home=async (req,res)=>{

    //when the page loads, show the files
    try{
        const csvfiles=await CSVFile.find();
       // console.log(csvfiles);
        return res.render('home',{
            title:"CSV Upload Home",
            files:csvfiles
        });
    }catch(err){
        console.log("Error fetching the CSV files");
        return res.status(500).send(`<h1>Internal Server Error</h1>`)
    }   
}



//for uploading a csv file
module.exports.uploadCSV= (req,res)=>{
    //console.log(CSVFile.csvPath);
     
   // console.log(req.body); //will be null cuz it needs to be parsed and handled by multer upload() function first 
    //the req is being handled by multer so we use upload function of it
    try{
        CSVFile.upload(req,res,async function(err){
            if(err){
                console.log("Multer error ***** ",err);
            }
            // console.log(req.body);
            //console.log(req.file);

            const fileIsExisting= await CSVFile.findOne({name:req.file.originalname});
            //console.log(fileIsExisting);

            //in case the user uploads a different file
            if(!req.file || req.file.mimetype!=="text/csv"){
                const filePath=path.join(__dirname,"..",`/uploads/csv_files/${req.file.filename}`);
                fs.unlinkSync(filePath);
                return res.status(415).send(`<h2>Unsupported Media Type, Please upload a CSV File</h2>
                                      <p>redirecting to home......</p>
                                      <script type="text/javascript">
                                        setTimeout(()=>{
                                            window.location.href="/";
                                        },3000);

                                    </script>
                
                `);
            }else if(fileIsExisting){
                //in case if the file is present in our database or a file with the same name exists
              //  console.log(req.file.filename);
                const filePath=path.join(__dirname,"..",`/uploads/csv_files/${req.file.filename}`);
               // console.log(filePath);
                fs.unlinkSync(filePath);
                return res.status(409).render("error",{
                    title:"File Exists"
                });
            }else{
                //create a file in the database
                const csv_file= await CSVFile.create({
                    name:req.file.originalname,
                    csv_file:CSVFile.csvPath+"/"+req.file.filename  //saving the complete path
                }); 
               // console.log(csv_file);
                return res.redirect('back');
            }
        });
    }catch(err){
        console.log("Error in uploading CSV ",err);
        return res.status(500).send(`<h1>Internal Server Error</h1>
                                     <p>Redirecting....</p>
                                    <script type="text/javascript">
                                        setTimeout(()=>{
                                            window.location.href="/";
                                        },3000)
                                    </script>
        `);
    }
   
}