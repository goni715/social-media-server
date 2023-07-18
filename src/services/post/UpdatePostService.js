const mongoose = require("mongoose");
const UpdatePostService= async (Request, DataModel) => {

    try{
        let LoginUserID=Request.headers.id;
        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQueryObject = {_id: new ObjectId(ID), userId: new ObjectId(LoginUserID)};
        let PostBody=Request.body;


        let data = await DataModel.updateOne(UpdateQueryObject,PostBody);
        return {message: "success", data: data}
    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=UpdatePostService

