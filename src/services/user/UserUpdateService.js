const UserUpdateService= async (Request,DataModel) => {
    try {
        let email = Request.headers['email']
        let data = await DataModel.updateOne({email: email}, Request.body)
        return {message: "success", data: data}
    } catch (error) {
        return {message: "fail", data: error}
    }
}
module.exports=UserUpdateService