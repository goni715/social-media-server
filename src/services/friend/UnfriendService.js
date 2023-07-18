const mongoose = require("mongoose");
const UnfriendService= async (Request, UsersModel) => {

    try{

        let friendID=Request.body['friendID'];
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(LoginUserID)};
        let UserData = await UsersModel.aggregate([{$match: QueryObject}])

        const friends = UserData[0].friends;
        let alreadyFriends= friends.find((currentValue)=>currentValue.toString() === friendID.toString());

        if(alreadyFriends){
            let UpdateData1 = await UsersModel.updateOne(QueryObject, {
                $pull: { friends: friendID }
            })
            let UpdateData2 = await UsersModel.updateOne({_id: new ObjectId(friendID)}, {
                $pull: { friends: LoginUserID }
            })
            let user = await UsersModel.aggregate([{$match: QueryObject}])
            return {message: "success", result:"Unfriend Successfully", data:user}
        }
        else{
            return {message: "fail", result:"Could not find this ID"}
        }
    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=UnfriendService

