const express = require('express');
const UploadController = require("../controllers/Upload/UploadController");
const upload = require("../helper/upload/upload");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");

const router = express.Router();


//Image Upload
router.post("/upload-image", upload.single("image"), UploadController.UploadImage);
router.post("/upload-profile-picture", upload.single("image"), AuthVerifyMiddleware, UploadController.UploadProfilePicture);


module.exports=router;