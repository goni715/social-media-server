const mongoose = require("mongoose");
const CommentPostService= async (Request,PostModel) => {

    try{

        let LoginUserID=Request.headers.id;
        let postID = Request.body['postID'];
        let Comment = Request.body['comment'];



        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(postID)};



        //already Rate is Added, Now update this rating

            const UpdatePost = await PostModel.updateOne(QueryObject,
                {
                    $push: {
                        comments: {
                            comment: Comment,
                            postedBy: LoginUserID,
                        },
                    }
                }
            )

        if(UpdatePost.modifiedCount ===1){
            let post = await PostModel.aggregate([{$match: QueryObject}])
            return {status: "success",data:post}
        }




    }
    catch (error) {

        return {status: "fail", data: error}
    }
}
module.exports=CommentPostService

