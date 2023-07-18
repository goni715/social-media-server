const mongoose = require("mongoose");
const DeleteFriendRequestService= async (Request, UsersModel) => {

    try{

        let friendID=Request.body['friendID'];
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(LoginUserID)};
        let UserData = await UsersModel.aggregate([{$match: QueryObject}])

        const friendRequests = UserData[0].friendRequests;
        let alreadyFriendRequests = friendRequests.find((currentValue)=>currentValue.toString() === friendID.toString());

        if(alreadyFriendRequests){
            let UpdateData1 = await UsersModel.updateOne(QueryObject, {
                $pull: { friendRequests: friendID }
            })
            let user = await UsersModel.aggregate([{$match: QueryObject}])
            return {message: "success", result:"Delete Friend Request", data:user}
        }
        else{
            return {message: "fail", result:"Could not find this ID"}
        }
    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=DeleteFriendRequestService

