const express = require('express');
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
 const PostController = require("../controllers/Post/PostController");
const upload = require("../helper/upload/upload");
const UploadController = require("../controllers/Upload/UploadController");


const router = express.Router();



router.post("/create-post",AuthVerifyMiddleware,PostController.CreatePost);
router.put("/update-post/:id",AuthVerifyMiddleware,PostController.UpdatePost);
router.post("/create-post-with-image", upload.single("image"), AuthVerifyMiddleware, UploadController.UploadPostPicture);
router.put("/update-post-with-image/:id", upload.single("image"), AuthVerifyMiddleware, UploadController.UpdatePostPicture);

router.get("/get-post/:id",AuthVerifyMiddleware,PostController.GetPost);
router.get("/delete-post/:id",AuthVerifyMiddleware,PostController.DeletePost);
router.post("/like-dislike-post",AuthVerifyMiddleware,PostController.LikeDislikePost);
router.get("/get-user-posts/:id",AuthVerifyMiddleware,PostController.GetUserPosts);
router.get("/get-timeline-posts",AuthVerifyMiddleware,PostController.GetTimelinePosts);
router.get("/get-likes/:id",AuthVerifyMiddleware,PostController.GetLikes);
router.put("/comment-post",AuthVerifyMiddleware,PostController.CommentPost);
router.put("/reply-post",AuthVerifyMiddleware,PostController.ReplyPost);


module.exports=router;