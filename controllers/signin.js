const handlesignin = (req,res,db,bcrypt)=>{
	const {email,password}=req.body;
   if(!email ||  !password)
{
  return res.status(400).json("incorrect form submission");
}

return  db.select('email','hash').from('login').where('email','=',email)
  .then(data=>{
 const isvalid=bcrypt.compareSync(password,data[0].hash);
	if(isvalid)
	{
		
		db.select('*').from('users')
		.where('email','=',email)
		.then(user=>{
         res.json(user)

		})
		.catch(err=>res.status(400).json('unable to get user'))


	} else
	{
	 res.status(400).json("wrong credientialssss inside if statement");	
	}

})
.catch(err=>res.status(400).json("wrong credentials"))




}

module.exports = {
handlesignin:handlesignin

};