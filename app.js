//Basic Import
const express = require('express');
const app = new express();
const authRouter = require('./src/routes/AuthRoute');
const userRouter = require('./src/routes/UserRoute');
const postRouter = require('./src/routes/PostRoute');
const uploadRouter = require('./src/routes/UploadRoute');
const dbConnect = require('./src/utility/dbConnect');


const bodyParser = require('body-parser');


//Security Middleware Import
const rateLimit = require('express-rate-limit');
const helemet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require("morgan");
const cors = require('cors');

//Database Library Import
const mongoose = require('mongoose');


//Security Middleware Implementation
app.use(morgan("dev"));
app.use(cors())
app.use(helemet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(cors())

//RequestBodySizeIncrease//Body Parser Implementation
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));



//Request Rate Limit Implementation

const Limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   //15 Minutes
    max: 300000000   //Limit each IP to 100 requests per windowMs
})
app.use(Limiter);



//MongoDB(mongoose) Atlas Database Connection
dbConnect();


// usage of routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/upload', uploadRouter)



//Undefined Route
app.use('*',(req,res)=>{
    res.status(404).json({status:"Fail", data:"Route Not Found"});
});


module.exports=app;