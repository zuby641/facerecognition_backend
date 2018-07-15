const express=require("express");
const register=require('./controllers/register');
const bodyparser=require("body-parser");

const bcrypt=require("bcrypt-nodejs");
const signin = require("./controllers/signin.js")
const profile = require("./controllers/profile.js")
const image = require("./controllers/image.js")
const cors=require("cors");

const knex=require('knex');

const app=express();
app.use(bodyparser.json());
app.use(cors());



const  db = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'allah',
    database : 'smart-brain'
  }
});
 //end of the knex function



app.get('/',(req,res)=>{
  db.select('*').from('users')
		.then(user=>{
         res.json(user)})
		.catch(err=>res.status(400).json('unable to get user'))


     });//end of first get

app.post('/signin',(req,res) => {signin.handlesignin(req,res,db,bcrypt)});//end of the signin post reqeust

app.post  ('/register',(req,res)=>{register.handleregister(req,res,db,bcrypt)});

app.get('/profile/:id',(req,res) =>{ profile.handleprofile(req,res,db)});//end of get request ..profile/id


app.put('/image',(req,res) =>{image.handleimage(req,res,db)} );//end of image entries.....

app.post('/imageurl',(req,res) =>{image.handleapi(req,res)} );


app.listen(8080,()=>{
  console.log("i am listening on port 8080");

 });//end of listen function