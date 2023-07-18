const mongoose = require("mongoose");
const GetTimelinePostsService= async (Request, PostModel, UsersModel) => {

    try {
        let LoginUserID = Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;

        let currentUserPosts = await PostModel.aggregate([
            {$match: {userId: new ObjectId(LoginUserID)}},
            {$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "user"}},
            {$lookup: {from: "users", localField: "comments.postedBy", foreignField: "_id", as: "CommentsBy"}},
            {$lookup: {from: "users", localField: "comments.reply.replyBy", foreignField: "_id", as: "ReplyBy"}},
            {$project: {userId: 1, desc: 1, _id: 1, image: 1, likes: 1, comments: 1, CommentsBy: 1, ReplyBy: 1, createdAt: 1, updatedAt: 1, firstName: {$first: "$user.firstName"}, lastName: {$first: "$user.lastName"}, profilePicture: {$first: "$user.profilePicture"}}}
        ])

        const posts = await UsersModel.aggregate([
            {$match: {_id: new ObjectId(LoginUserID)}},
            {$lookup: {from: "posts", localField: "following", foreignField: "userId", as: "followingPosts"}},
            {$lookup: {from: "users", localField: "followingPosts.userId", foreignField: "_id", as: "followingUser"}},
            {$lookup: {from: "users", localField: "followingPosts.comments.postedBy", foreignField: "_id", as: "followingPostsCommentsBy"}},
            {$lookup: {from: "users", localField: "followingPosts.comments.reply.replyBy", foreignField: "_id", as: "followingPostsReplyBy"}},
            {$lookup: {from: "posts", localField: "friends", foreignField: "userId", as: "friendPosts"}},
            {$lookup: {from: "users", localField: "friendPosts.userId", foreignField: "_id", as: "friendUser"}},
            {$lookup: {from: "users", localField: "friendPosts.comments.postedBy", foreignField: "_id", as: "friendPostsCommentsBy"}},
            {$lookup: {from: "users", localField: "friendPosts.comments.reply.replyBy", foreignField: "_id", as: "friendPostsReplyBy"}},
            {$project: {followingPosts: 1, followingUser: 1, friendPosts: 1, followingPostsCommentsBy: 1, friendPostsCommentsBy: 1, friendUser: 1, friendPostsReplyBy: 1, _id: 0, followingPostsReplyBy: 1}}
        ]);

        let followingPosts = posts[0].followingPosts;
        let followingUser = posts[0].followingUser;
        let followingPostsCommentsBy = posts[0].followingPostsCommentsBy;
        let followingPostsReplyBy = posts[0].followingPostsReplyBy;
        let friendPosts = posts[0].friendPosts;
        let friendUser = posts[0].friendUser;
        let friendPostsCommentsBy = posts[0].friendPostsCommentsBy;
        let friendPostsReplyBy = posts[0].friendPostsReplyBy;


        if (followingPosts.length > 0) {

            await followingPosts.forEach((item, i) => {
                let result = followingUser.find((currentValue) => currentValue._id.toString() === followingPosts[i].userId.toString());
                if (result._id.toString() === followingPosts[i].userId.toString()) {
                    item.firstName = result.firstName;
                    item.lastName = result.lastName;
                    item.profilePicture = result.profilePicture;
                }
            })


        }


        if (friendPosts.length > 0) {
            await friendPosts.forEach((item, i) => {
                let result = friendUser.find((currentValue) => currentValue._id.toString() === friendPosts[i].userId.toString());
                if (result._id.toString() === friendPosts[i].userId.toString()) {
                    item.firstName = result.firstName;
                    item.lastName = result.lastName;
                    item.profilePicture = result.profilePicture;
                }
            })
        }


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


        //FriendPostCommentsBy
        for (let x = 0; x < friendPosts.length; x++) {

            await friendPosts[x]['comments'].forEach((item, i) => {
                let result = friendPostsCommentsBy.find((currentValue) => currentValue._id.toString() === friendPosts[x]['comments'][i].postedBy.toString());
                if (result._id.toString() === friendPosts[x]['comments'][i].postedBy.toString()) {
                    item.firstName = result.firstName;
                    item.lastName = result.lastName;
                    item.profilePicture = result.profilePicture;
                }
            })

        }



        //FollowingPostCommentsBy
        for (let x = 0; x < followingPosts.length; x++) {

            await followingPosts[x]['comments'].forEach((item, i) => {
                let result = followingPostsCommentsBy.find((currentValue) => currentValue._id.toString() === followingPosts[x]['comments'][i].postedBy.toString());
                if (result._id.toString() === followingPosts[x]['comments'][i].postedBy.toString()) {
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




        //ReplyFriendPostComment
        for (let x = 0; x < friendPosts.length; x++) {
            for (let n = 0; n < friendPosts[x]['comments'].length; n++) {
                await friendPosts[x]['comments'][n]?.reply.forEach((item, i) => {
                    let result = friendPostsReplyBy.find((currentValue) => currentValue._id.toString() === friendPosts[x]['comments'][n]?.reply[i].replyBy.toString());
                    if (result._id.toString() === friendPosts[x]['comments'][n]?.reply[i].replyBy.toString()) {
                        item.firstName = result.firstName;
                        item.lastName = result.lastName;
                        item.profilePicture = result.profilePicture;
                    }
                })
            }
        }




        //ReplyFriendPostComment
        for (let x = 0; x < followingPosts.length; x++) {
            for (let n = 0; n < followingPosts[x]['comments'].length; n++) {
                await followingPosts[x]['comments'][n]?.reply.forEach((item, i) => {
                    let result = followingPostsReplyBy.find((currentValue) => currentValue._id.toString() === followingPosts[x]['comments'][n]?.reply[i].replyBy.toString());
                    if (result._id.toString() === followingPosts[x]['comments'][n]?.reply[i].replyBy.toString()) {
                        item.firstName = result.firstName;
                        item.lastName = result.lastName;
                        item.profilePicture = result.profilePicture;
                    }
                })
            }
        }



        let timeLinePosts = await currentUserPosts.concat(...followingPosts, ...friendPosts)
            .sort((a,b)=>{
                return b.createdAt - a.createdAt;
            });


        return {message:"success", data: timeLinePosts}


    } catch (error) {
        return {message:"success", data: error.toString()}
    }
}



module.exports=GetTimelinePostsService

