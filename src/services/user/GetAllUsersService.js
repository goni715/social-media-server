
const GetAllUsersService= async (Request,DataModel) => {

    try {
        let data =await DataModel.aggregate([
            {$project:{_id:1, email:1, firstName:1, lastName:1, isAdmin:1, followers:1, following:1, friendRequests:1, friends:1, profilePicture:1, createdAt:1}}
        ]);
        return  {status: "success", data: data}
    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=GetAllUsersService