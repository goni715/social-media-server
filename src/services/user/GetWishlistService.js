const mongoose = require("mongoose");
const GetWishlistService= async (Request,DataModel) => {

    try{

        let LoginUserID=Request.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DetailsQueryObject = {_id: new ObjectId(LoginUserID)};

        let data = await DataModel.aggregate([
            {$match: DetailsQueryObject},
            {
                $lookup: {from: "products", localField: "wishlist", foreignField: "_id", as: "WishlistDetails"}
            }
        ])
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=GetWishlistService