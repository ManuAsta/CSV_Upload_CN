const mongoose = require('mongoose');
const uri= process.env.MONGO_URI;

//const uri='mongodb://127.0.0.1:27017/csv_upload'

async function main() {
  await mongoose.connect(uri);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().then(()=>{
    console.log("Succesfully conntected to Database");
});
main().catch(err => console.log("Error connecting to Database ",err));
