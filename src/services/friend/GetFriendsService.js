const mongoose = require('mongoose');

const GetFriendsService = async (Request, DataModel, JoinStage, Projection) => {

    try {
        let ID=Request.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {_id: new ObjectId(ID)};

        let data = await DataModel.aggregate([
            {$match: QueryObject},
            JoinStage,
            Projection
        ]);

        return {message: "success", data: data}
    } catch (error) {
        return {message: "error", data: error}
    }

}


module.exports=GetFriendsService