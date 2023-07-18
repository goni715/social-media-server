const mongoose = require("mongoose");

const UnblockUserService = async (Request, Model) => {

    let ID=Request.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let UpdateQueryObject = {_id: new ObjectId(ID)};
    let UpdateData = {isBlocked:false};

    try {
        let data = await Model.updateOne(UpdateQueryObject, UpdateData)
        return {status: "User Unblocked Success",data:data}
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }

}

module.exports=UnblockUserService


