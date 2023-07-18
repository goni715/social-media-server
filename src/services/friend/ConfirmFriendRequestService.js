const mongoose = require("mongoose");
const ConfirmFriendRequestService= async (Request, UsersModel) => {

    try{

        let friendID=Request.body['friendID'];
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(LoginUserID)};
        let UserData = await UsersModel.aggregate([{$match: QueryObject}])

        const friendRequests = UserData[0].friendRequests;
        const friends = UserData[0].friends;
        let alreadyRequests = friendRequests.find((currentValue)=>currentValue.toString() === friendID.toString());
        let alreadyFriends = friends.find((currentValue)=>currentValue.toString() === friendID.toString());

       if(alreadyRequests){
            let UpdateData1 = await UsersModel.updateOne(QueryObject, {
                $pull: { friendRequests: friendID }
            })
           let UpdateData2 = await UsersModel.updateOne(QueryObject, {
               $push: { friends: friendID }
           })

           let UpdateData3 = await UsersModel.updateOne({_id: new ObjectId(friendID)}, {
               $push: { friends: LoginUserID }
           })
            let user = await UsersModel.aggregate([{$match: QueryObject}])
            return {message: "success", result:"You are now friends", data:user}
        }
        else if(alreadyFriends){
           return {message: "success", result:"Already, You are my friends"}
        }
        else{
           return {message: "fail", result:"Wrong Friend ID"}
        }

    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=ConfirmFriendRequestService

