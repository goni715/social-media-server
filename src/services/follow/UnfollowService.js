const mongoose = require("mongoose");
const UnfollowService= async (Request, UsersModel) => {


    try{
        let followUserID=Request.body['followUserID'];
        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UserData = await UsersModel.aggregate([{$match: {_id: new ObjectId(followUserID)}}])

        const followers = UserData[0].followers;
        let alreadyFollowed = followers.find((currentValue)=>currentValue.toString() === LoginUserID.toString());


        if(alreadyFollowed){
            let UpdateData1 = await UsersModel.updateOne({_id: new ObjectId(followUserID)}, {
                $pull: { followers: LoginUserID }
            })

            let UpdateData2 = await UsersModel.updateOne({_id: new ObjectId(LoginUserID)}, {
                $pull: { following: followUserID }
            })

            return {message: "success", result:"User Unfollowed",}

        }else{
            return {message: "success", result:"User is not followed by you"}
        }

    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=UnfollowService

