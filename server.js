const axios = require("axios");
const cheerio = require('cheerio')
const express = require("express");
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose')
const db = require('./model')
const MONGODB_URL = "mongodb://localhost/test"


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

app.post('/',function(req,res) { 
    console.log(req.body.order) ;
    if (req.body.order==="do"){
        axios.get("https://www.ostechnix.com/youtube-dl-tutorial-with-examples-for-beginners/")
            .then(function(response){
            const $ = cheerio.load(response.data);

            const result = [];
           $('h4').slice(0,12).each(function(index,ele){
               let item = {};
                item.order=$(this).text();
                item.commands = $(this).nextUntil('h4').filter('pre').map(function(i,el) {return $(this).text()}).get()
                db.Content.create(item,(err,saved)=>{
                    if (err) console.log(err)
                    else console.log(saved)
                })
            })
                res.json({feedback:"done"})
            })
            }
        })

app.listen(PORT,function(){
    console.log("Server running at PORT 3000")
    mongoose.connect(MONGODB_URL,{useNewUrlParser: true,useUnifiedTopology: true});
    let db = mongoose.connection;
    db.once('open',()=>console.log('DB connected!'))
})