const mongoose = require("mongoose");
const DeleteUserByIDService = async (Request, Model) => {

    try{
        let DeleteID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DeleteQueryObject = {_id: new ObjectId(DeleteID)};
        let Delete =  await Model.deleteOne(DeleteQueryObject)
        return {message: "success",Delete:Delete}
    }
    catch (error) {
        return {message: "fail", data: error.toString()}
    }
}
module.exports=DeleteUserByIDService