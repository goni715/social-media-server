const CreatePostService= async (Request, DataModel) => {

    try{
        let LoginUserID=Request.headers.id;
        let PostBody=Request.body;
        PostBody.userId=LoginUserID;
        let data = await DataModel.create(PostBody)
        return {message: "success", data: data}
    }
    catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=CreatePostService