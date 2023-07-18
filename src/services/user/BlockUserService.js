const mongoose = require("mongoose");

const BlockUserService = async (Request, Model) => {

    let ID=Request.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let UpdateQueryObject = {_id: new ObjectId(ID)};
    let UpdateData = {isBlocked:true};

    try {
        let BlockUser = await Model.updateOne(UpdateQueryObject, UpdateData)
        return {status: "User Blocked Success",data:BlockUser}
    } catch (error) {
        return {status: "fail", data: error.toString()}
    }

}

module.exports=BlockUserService


