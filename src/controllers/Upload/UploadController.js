//Upload Single Image
const cloudinary  = require('../../utility/cloudinary');
const fs = require("fs");
const UsersModel = require('../../models/Users/UsersModel')
const PostModel = require('../../models/Post/PostModel');
const mongoose = require("mongoose");


exports.UploadImage = async (req, res) => {

    try{
        let cloudinaryResponse;
        if (req.file) {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "Social-Media",
            });

            //fs.unlinkSync(req.file.path);
        } else {
            res.status(400).json('Please provide a file');
        }

        res.status(200).json({
            message: 'success',
            data: {
                public_id: cloudinaryResponse?.public_id,
                img_url: cloudinaryResponse?.secure_url,
            },
            result: cloudinaryResponse
        });
    }
    catch (error) {
        res.status(500).json({message:"fail", data:error.toString()});
    }


}


exports.UploadProfilePicture = async (req, res) => {

    try{

        console.log(req.body.text)

        let LoginUserID=req.headers.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQuery = {_id: new ObjectId(LoginUserID)};


        let cloudinaryResponse;
        if (req.file) {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "Social-Media",
            });

            fs.unlinkSync(req.file.path);
        } else {
            res.status(400).json('Please provide a file');
        }

        if(cloudinaryResponse){
            await UsersModel.updateOne(UpdateQuery, {profilePicture:cloudinaryResponse?.secure_url})
            let data = await UsersModel.aggregate([{$match: UpdateQuery}]);
            res.status(200).json({message:"success", data: data});
        }

    }
    catch (error) {
        res.status(500).json({message:"fail", data:error.toString()});
    }


}





exports.UploadPostPicture = async (req, res) => {

    try{

        let LoginUserID=req.headers.id;

        let cloudinaryResponse;
        if (req.file) {
            cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "Social-Media",
            });

            fs.unlinkSync(req.file.path);
        } else {
            res.status(400).json('Please provide a file');
        }

        if(cloudinaryResponse){
            
            let PostBody={
                userId:LoginUserID,
                desc: req.body['desc'],
                image: cloudinaryResponse?.secure_url
            }
            let data = await PostModel.create(PostBody)
            res.status(200).json({message:"success", data: data});


       }

    }
    catch (error) {
        res.status(500).json({message:"fail", data:error.toString()});
    }


}



exports.UpdatePostPicture = async (req, res) => {

    try{

        let LoginUserID=req.headers.id;
        let ID=req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let UpdateQuery = {_id: new ObjectId(ID), userId: new ObjectId(LoginUserID)};


       let cloudinaryResponse;
       if (req.file) {
           cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
               folder: "Social-Media",
           });

           fs.unlinkSync(req.file.path);
       } else {
           res.status(400).json('Please provide a file');
       }


       if(cloudinaryResponse){
           let update = await PostModel.updateOne(UpdateQuery,
               {desc:req.body['desc'], image:cloudinaryResponse?.secure_url}
           )
           res.status(200).json({message:"success", data:update});
       }



    }
    catch (error) {
        res.status(500).json({message:"fail", data:error.toString()});
    }


}



