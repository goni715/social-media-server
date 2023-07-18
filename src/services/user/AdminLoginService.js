const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcrypt");

const AdminLoginService= async (Request, res, DataModel) => {

    let email = Request.body.email;
    let password = Request.body.password;

    try {

        let findAdmin =await DataModel.aggregate([{$match:{email:email}}])

        if(findAdmin.length>0) {

            if(findAdmin[0].role !== "admin"){
                return {status:"fail", data:"You are not Admin"}
            }else{
                const CheckPassword = await bcrypt.compare(password, findAdmin[0].password);
                //if password is not matching
                if (!CheckPassword) {
                    return {status: "fail", data:"Wrong Password"};
                } else {
                    let TokenData = {email: findAdmin[0].email, id: findAdmin[0]._id}
                    let token = await CreateToken(TokenData);
                    let update = await DataModel.updateOne({email:email},{refreshToken:token})
                    let userData =await DataModel.aggregate([{$match:{email:email}}])
                    res.cookie("refreshToken", token, {httpOnly:true, maxAge: 72 * 60 * 60 * 1000})

                    return {status:"success",token:token, data:userData[0]}
                }
            }
        } else {
            return {status:"fail", data:"No User Found"}
        }
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=AdminLoginService