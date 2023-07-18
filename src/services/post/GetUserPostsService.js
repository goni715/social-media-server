const mongoose = require("mongoose");
const GetUserPostsService= async (Request, DataModel) => {

    try {
        let userId=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DetailsQueryObject = {userId: new ObjectId(userId)};
        let currentUserPosts = await DataModel.aggregate([
            {$match: DetailsQueryObject},
            {$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "user"}},
            {$lookup: {from: "users", localField: "comments.postedBy", foreignField: "_id", as: "CommentsBy"}},
            {$lookup: {from: "users", localField: "comments.reply.replyBy", foreignField: "_id", as: "ReplyBy"}},
            {$project: {userId: 1, desc: 1, _id: 1, image: 1, likes: 1, comments: 1, CommentsBy: 1, ReplyBy: 1, createdAt: 1, updatedAt: 1, firstName: {$first: "$user.firstName"}, lastName: {$first: "$user.lastName"}, profilePicture: {$first: "$user.profilePicture"}}},
            {$sort : { createdAt: -1 }}
        ])



        //CurrentPostCommentsBy
        for (let x = 0; x < currentUserPosts.length; x++) {

            await currentUserPosts[x]['comments'].forEach((item, i) => {
                let result = currentUserPosts[x]['CommentsBy'].find((currentValue) => currentValue._id.toString() === currentUserPosts[x]['comments'][i].postedBy.toString());
                if (result._id.toString() === currentUserPosts[x]['comments'][i].postedBy.toString()) {
                    item.firstName = result.firstName;
                    item.lastName = result.lastName;
                    item.profilePicture = result.profilePicture;
                }
            })

        }


        //ReplyCurrentUserPostComment
        for (let x = 0; x < currentUserPosts.length; x++) {
            for (let n = 0; n < currentUserPosts[x]['comments'].length; n++) {
                await currentUserPosts[x]['comments'][n]?.reply.forEach((item, i) => {
                    let result = currentUserPosts[x]['ReplyBy'].find((currentValue) => currentValue._id.toString() === currentUserPosts[x]['comments'][n]?.reply[i].replyBy.toString());
                    if (result._id.toString() === currentUserPosts[x]['comments'][n]?.reply[i].replyBy.toString()) {
                        item.firstName = result.firstName;
                        item.lastName = result.lastName;
                        item.profilePicture = result.profilePicture;
                    }
                })
            }
        }


        return  {message: "success", data: currentUserPosts}
    }
    catch (error){
        return {message: "fail", data: error}
    }
}
module.exports=GetUserPostsService