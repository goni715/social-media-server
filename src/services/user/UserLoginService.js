const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcrypt");

const UserLoginService= async (Request, res, DataModel) => {

    try {
        let email = Request.body.email;
        let password = Request.body.password;
        let user =await DataModel.aggregate([{$match:{email:email}}]);

           if(user.length>0) {
                let CheckPassword = await bcrypt.compare(password, user[0].password);
                //if password is not matching
                  if (!CheckPassword) {
                      res.status(403).json({message: "fail", data:"Wrong Password!"});
                  }else{
                    let TokenData = {email: user[0].email, id: user[0]._id,}
                    let token = await CreateToken(TokenData);
                    res.status(200).json({message:"success",token:token, data:user});
               }
           }
           else{
                res.status(402).json({message: "fail", data:"Could not Find this Email!"});
           }
    }
    catch (error) {
        res.status(500).json({ message: "error", data:error.toString()});
    }
}
module.exports=UserLoginService