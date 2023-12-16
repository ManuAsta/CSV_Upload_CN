const mongoose = require('mongoose');

main().catch(err => console.log("Error connecting to Database ",err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/csv_upload');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().then(()=>{
    console.log("Succesfully conntected to Database");
});