const mongoose = require("mongoose");
const DeletePostService= async (Request, Model) => {

    try{
        let LoginUserID=Request.headers.id;
        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {_id: new ObjectId(ID), userId: new ObjectId(LoginUserID)};
        let Delete =  await Model.deleteOne(DeleteQueryObject)
        return {message: "success",Delete:Delete}
    }
    catch (error) {
        return {message: "fail", data: error.toString()}
    }
}
module.exports=DeletePostService