//loading dotenv
const dotenv=require("dotenv");
const express = require('express')
const app = express();
const port= process.env.PORT ||8000;
const expressLayouts=require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware')
const db=require('./config/mongoose');

//setting the static folder and upload folder
app.use(express.static('./assets'));
app.use('/uploads',express.static('./uploads'));

//for layouts
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//parsing and upload folder
app.use(express.urlencoded({ extended: true }));


//setting up the view engine and template
app.set('view engine','ejs');
app.set('views','views');

//sassmiddleware
app.use(sassMiddleware({ //node sass middleware
    /* Options */
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix:  '/css',  // Where css is at <link rel="stylesheets" href="/css/style.css"/>
}));


//Routing
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log("Server failed to listen on the port ",port);
    }else{
        console.log("Server  listening on the port ",port);
    }
})