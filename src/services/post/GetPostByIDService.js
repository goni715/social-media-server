const mongoose = require("mongoose");
const GetPostByIDService= async (Request, DataModel) => {
    
    try{
        let LoginUserID=Request.headers.id;
        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let DetailsQueryObject = {_id: new ObjectId(ID)};
        
        let post = await DataModel.aggregate([{$match: DetailsQueryObject}])
        return {message: "success", data: post}
    }
    catch (error) {
        return {message: "fail", data: error.toString()}
    }
}
module.exports=GetPostByIDService