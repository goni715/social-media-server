var jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    let Token=req.headers['token'];
    jwt.verify(Token,"SecretKey123456789",function (err,decoded) {
        if(err){
            res.status(401).json({status:"unauthorized"})
        }
        else {
            let data =decoded['data'];
            //console.log(data.email)
            //console.log(data.id);
            req.headers.email= data.email;
            req.headers.id= data.id;
            req.headers.username= data.username;
            next()
        }
    })
}
