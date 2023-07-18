const mongoose = require("mongoose");
const GetLikesService= async (Request, DataModel) => {

    try{

        const ObjectId = mongoose.Types.ObjectId;
        let postId =Request.params.id;
        let DetailsQueryObject = {_id: new ObjectId(postId)};

        let likes = await DataModel.aggregate([
            {$match: DetailsQueryObject},
            {$lookup: {from: "users", localField: "likes", foreignField: "_id", as: "Likes"}},
            {$project: {_id:1, likes:1, Likes:1}}
        ])
        return {message: "success", data: likes}
    }
    catch (error) {
        return {message: "fail", data: error.toString()}
    }
}

module.exports=GetLikesService