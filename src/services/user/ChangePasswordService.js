const bcrypt = require("bcrypt");

const ChangePasswordService = async (Request, UsersModel) => {

    try{
        let CurrentPassword = Request.params.currentPassword;
        let NewPassword = Request.params.newPassword;
        let Email = Request.headers['email'];

        //Database First Process
        let data =await UsersModel.aggregate([{$match:{email:Email}}])

        const CheckPassword = await bcrypt.compare(CurrentPassword, data[0].password);
        //if password is not matching
        if (!CheckPassword) {
            return {status:"fail", data: "Wrong Current Password"};
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(NewPassword, salt);
            //Database Second Process
            let PasswordUpdate = await UsersModel.updateOne({email: Email}, {email: Email, password: hashedPassword});
            return {status:"success", data: PasswordUpdate};
        }
    }
    catch(error){
        return {status: "fail", data: error}
    }
}


module.exports=ChangePasswordService