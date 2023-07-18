const mongoose = require("mongoose");
const UpdateUserByIDService= async (Request,DataModel) => {

    let ID=Request.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let UpdateQueryObject = {_id: new ObjectId(ID)};

    try {
        let data = await DataModel.updateOne(UpdateQueryObject, Request.body)
        return {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UpdateUserByIDService