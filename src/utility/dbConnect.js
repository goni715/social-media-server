require('dotenv').config();
const mongoose = require("mongoose");

const dbConnect = () => {

    //let uri = "mongodb+srv://<username>:<password>@cluster0.m7fozzp.mongodb.net/social-pedia?retryWrites=true&w=majority";
    let option = {user:process.env.MONGO_USER, pass:process.env.MONGO_PASS,autoIndex:true};

    mongoose.connect(process.env.MONGO_URI,option).then((res)=>{
        console.log("Connection Success");
    }).catch((error)=>{
        console.log("Connection Failed");
        console.log(error);
    })

}


module.exports=dbConnect;