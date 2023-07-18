const mongoose = require("mongoose");
const LikeDislikePostService= async (Request, DataModel) => {


    try{

        let LoginUserID=Request.headers.id;
        let postID=Request.body['postID'];
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(postID)};

        //Find the Post which you want to be liked
        let postData = await DataModel.aggregate([{$match: QueryObject}]);



        //find if the user has already liked the blog
        const alreadyLiked = postData[0].likes.find((currentValue)=>currentValue.toString() === LoginUserID.toString());

       //If You don't give the Like, You give the like//লাইক না দিয়ে থাকলে, লাইক দাও
        if (!alreadyLiked) {
            const UpdatePost = await DataModel.updateOne(QueryObject,{
                $push: { likes: LoginUserID }
            })
            let post = await DataModel.aggregate([{$match: QueryObject}])
            return {message: "success", result:"Post Liked", data: post}
        }
        else{
            //Remove Like
            const UpdatePost = await DataModel.updateOne(QueryObject,{
                $pull: { likes: LoginUserID },
            })

            let post = await DataModel.aggregate([{$match: QueryObject}])
            return {message: "success", result:"Like Removed", data: post}
        }

 
    }
    catch (error) {
        return {message: "fail", data: error.toString()}
    }
}
module.exports=LikeDislikePostService