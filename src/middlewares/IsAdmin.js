const jwt = require("jsonwebtoken");
const UsersModel = require("../models/Users/UsersModel");


module.exports= async (req,res,next)=>{
   const Email = req.headers.email;
   //console.log("My Email: "+Email);

    const adminUser = await UsersModel.findOne( {email: Email });
    //console.log(adminUser);

    if(adminUser.role !== "admin"){
        res.status(200).json("You are not an Admin")
    }
    else{
        next();
    }


}

