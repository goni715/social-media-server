const mongoose = require("mongoose");
const GetUserDetailsByIDService= async (Request, DataModel) => {

    let LoginUserID=Request.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let QueryObject = {_id: new ObjectId(LoginUserID)};

    try {

        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ]);

        return  {message: "success", data: data}
    } catch (error) {
        return {message: "fail", data: error}
    }



}
module.exports=GetUserDetailsByIDService