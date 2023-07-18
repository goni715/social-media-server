const mongoose = require("mongoose");
const AddCancelFriendRequestService= async (Request, UsersModel) => {


    try{

        let friendID=Request.body['friendID'];
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(friendID)};
        let UserData = await UsersModel.aggregate([{$match: QueryObject}])

        const friendRequests = UserData[0].friendRequests;
        const friends = UserData[0].friends;
        let alreadySendRequest = friendRequests.find((currentValue)=>currentValue.toString() === LoginUserID.toString());
        let alreadyFriends = friends.find((currentValue)=>currentValue.toString() === LoginUserID.toString());

        if(!alreadyFriends) {
            if (!alreadySendRequest) {
                let UpdateData1 = await UsersModel.updateOne(QueryObject, {
                    $push: {friendRequests: LoginUserID}
                })
                let user = await UsersModel.aggregate([{$match: QueryObject}])
                return {message: "success", result: "Send Friend Request", data: user}
            } else {

                let UpdateData2 = await UsersModel.updateOne(QueryObject, {
                    $pull: {friendRequests: LoginUserID}
                })
                let user = await UsersModel.aggregate([{$match: QueryObject}])
                return {message: "success", result: "Cancel Friend Request", data: user}
            }
        }
        else{
            return {message: "success", result: "Already, You are my friends"}
        }

    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=AddCancelFriendRequestService

