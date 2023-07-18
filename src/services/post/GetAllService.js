
const GetAllService= async (Request, DataModel, Projection) => {

    try {

        let  data =await DataModel.aggregate([
            Projection
          ]);

        return  {status: "success", data: data}

    }
    catch (error){
        return {status: "fail", data: error}
    }
}
module.exports=GetAllService