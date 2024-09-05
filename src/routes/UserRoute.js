const express = require('express');
const UsersController = require("../controllers/Users/UsersController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");

const router = express.Router();


//This is HomePage
router.get('/', function(req,res){
    res.end('This is HomePage')
});



//Users
router.get("/get-user/:id",AuthVerifyMiddleware,UsersController.GetUser);
router.get("/get-all-users", UsersController.GetAllUser);
router.get("/delete-user/:id",UsersController.DeleteUser);
router.put("/update-user",AuthVerifyMiddleware, UsersController.UpdateUser);


router.post("/follow-user",AuthVerifyMiddleware, UsersController.FollowUser);
router.post("/unfollow-user",AuthVerifyMiddleware, UsersController.UnfollowUser);

router.post("/add-cancel-friend-request",AuthVerifyMiddleware, UsersController.AddCancelFriendRequest);
router.post("/confirm-friend-request",AuthVerifyMiddleware, UsersController.ConfirmFriendRequest);
router.post("/delete-friend-request",AuthVerifyMiddleware, UsersController.DeleteFriendRequest);
router.post("/unfriend-user",AuthVerifyMiddleware, UsersController.UnfriendUser);


router.get("/get-followers",AuthVerifyMiddleware,UsersController.GetFollowers);
router.get("/get-following",AuthVerifyMiddleware,UsersController.GetFollowing);
router.get("/get-friends/:id",AuthVerifyMiddleware,UsersController.GetFriends);
router.get("/get-friend-requests",AuthVerifyMiddleware,UsersController.GetFriendRequests);



module.exports=router;