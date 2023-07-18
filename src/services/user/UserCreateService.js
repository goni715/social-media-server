const hashedPassword = require("../../utility/hashedPassword");
const UserCreateService= async (Request,DataModel) => {
    try{
        let PostBody=Request.body;
        let user = await DataModel.aggregate([{$match:{email: Request.body['email']}}]);
        if(user.length === 0){
            PostBody.password = await hashedPassword(PostBody.password);//hashedPassword
            let data = await DataModel.create(PostBody)
            return {status: "success", data: data}
        }else{
            return {status: "fail", data:"EmailAlreadyExist"};
        }
    }
    catch (error) {
        return {status: "error", data: error}
    }
}
module.exports=UserCreateService