const mongoose = require("mongoose");
const ReplyPostService= async (Request,PostModel) => {

    try{

        let LoginUserID=Request.headers.id;
        let postID = Request.body['postID'];
        let commentID = Request.body['commentID'];
        let text = Request.body['text'];
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(postID)};
        let post = await PostModel.aggregate([{$match: QueryObject}])

        let alreadyRated = post[0].comments.find((currentValue) => currentValue._id.toString() === commentID.toString());



        //already Rate is Added, Now update this rating


            const UpdateRating = await PostModel.updateOne(
                {comments : {$elemMatch : alreadyRated}},
                {
                    "$push":
                        {"bookings.$.reply":
                                {
                                    "replyBy": LoginUserID,
                                    "text": text
                                }
                        }
                }
            )

        return {status:"success", data:UpdateRating};





    }
    catch (error) {

        return {status: "fail", data: error}
    }
}
module.exports=ReplyPostService

