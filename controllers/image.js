const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: 'c9e397162c6f4249b402f02744dd7b92'});


const handleapi =(req,res)=>{
 app.models.predict(Clarifai.FACE_DETECT_MODEL, { url: req.body.input})
 .then(data=>{
 	res.json(data);


 })
 .catch(err=> res.status(400).json(err))
}



const handleimage =(req,res,db)=>{


const {id}=req.body;
db('users').where('id','=',id)
.increment('entries',1)
.returning('entries')
.then(entries=>{
	res.json(entries);
})
.catch(err=>res.status(400).json('unable to get entries'))



}

module.exports ={
 handleimage:handleimage,

 handleapi:handleapi
};