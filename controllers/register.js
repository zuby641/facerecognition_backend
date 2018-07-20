const handleregister= (req,res,db,bcrypt)=>{
const { email,name,password}=req.body;
console.log(email);
console.log(name);
console.log(password);
if(!email || !name || !password)
{
  return res.status(400).json("incorrect form submission");
}
const hash=bcrypt.hashSync(password);
db.transaction(trx=>{

	trx.insert({

		hash:hash,
		email:email
	})
	.into('login')
	.returning('email')
	.then(loginemail=>{
	return 	trx('users')
.returning('*')
.insert({
	//because we are returnig an array not an object
	email:loginemail[0],
	name:name,
	joined:new Date()
})
.then(userr=>{
	res.json(userr[0]);
})

	})
	.then(trx.commit)
	.catch(trx.rollback)
})//end of transaction
.catch(err=>res.status(400).json('unable to register!..'))

 

}//end of register post request
module.exports=
{
	handleregister:handleregister
};