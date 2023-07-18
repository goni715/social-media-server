const mongoose = require("mongoose");
const GetFriendRequestService = async (Request, DataModel, JoinStage, Projection) => {


    try {
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(LoginUserID)};

        let data = await DataModel.aggregate([
            {$match: QueryObject},
            JoinStage,
            Projection
        ]);

        return {message: "success", data: data}
    } catch (error) {
        return {message: "error", data: error}
    }


}
module.exports=GetFriendRequestService