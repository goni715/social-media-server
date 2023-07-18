const UsersModel = require("../../models/Users/UsersModel");
const jwt = require("jsonwebtoken");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const GetAllUsersService = require("../../services/user/GetAllUsersService");
const GetUserDetailsByIDService = require("../../services/user/GetUserDetailsByIDService");
const DeleteUserByIDService = require("../../services/user/DeleteUserByIDService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const BlockUserService = require("../../services/user/BlockUserService");
const UnblockUserService = require("../../services/user/UnblockUserService");
const ChangePasswordService = require("../../services/user/ChangePasswordService");
const FollowService = require("../../services/follow/FollowService");
const UnfollowService = require("../../services/follow/UnfollowService");
const AddCancelFriendRequestService = require("../../services/friend/AddCancelFriendRequestService");
const ConfirmFriendRequestService = require("../../services/friend/ConfirmFriendRequestService");
const DeleteFriendRequestService = require("../../services/friend/DeleteFriendRequestService");
const DetailsService = require("../../services/user/DetailsService");
const UnfriendService = require("../../services/friend/UnfriendService");
const GetFriendsService = require("../../services/friend/GetFriendsService");
const GetFriendRequestService = require("../../services/friend/GetFriendRequestService");



exports.Registration=async (req, res) => {
    let Result=await UserCreateService(req,UsersModel)
    res.status(200).json(Result)
}





//SignUpUser Email Verify--Step-01//OTP-Send
exports.SignUpEmailVerify = async (req,res)=> {
    let Result=await SignUpEmailVerifyService(req,UsersModel,RegOTPModel)
    res.status(200).json(Result)
}


//SignUp//SignUpVerifyOTP--Step-02--DataInsert-
exports.SignUpVerifyOTP = async (req,res)=>{
    let Result = await SignUpVerifyOtpService(req,UsersModel,RegOTPModel)
    res.status(200).json(Result)

}






exports.Login=async(req,res)=>{
    await UserLoginService(req,res,UsersModel)
}

exports.AdminLogin=async(req,res)=>{
    let Result=await AdminLoginService(req,res,UsersModel)
    res.status(200).json(Result)
}


exports.GetAllUser=async(req,res)=>{
    let Result=await GetAllUsersService(req,UsersModel)
    res.status(200).json(Result)
}


//Get Single User
exports.GetUser=async (req, res) => {
    let Result=await GetUserDetailsByIDService(req,UsersModel);
    res.status(200).json(Result)
}

//Delete Single User
exports.DeleteUser=async (req, res) => {
    let Result=await DeleteUserByIDService(req,UsersModel)
    res.status(200).json(Result)
}


//Update a Single User
exports.UpdateUser=async (req, res) => {
    let Result=await UserUpdateService(req,UsersModel)
    res.status(200).json(Result)
}



//Block User
exports.BlockUser=async (req, res) => {
    let Result=await BlockUserService(req,UsersModel)
    res.status(200).json(Result)
}




//UnBlock User
exports.UnblockUser=async (req, res) => {
    let Result=await UnblockUserService(req,UsersModel)
    res.status(200).json(Result)
}



//ChangePassword
exports.ChangePassword = async (req,res)=>{
    let Result = await ChangePasswordService(req,UsersModel);
    res.status(200).json(Result)
}



//Step-01// Send OTP
exports.ForgotPasswordVerifyEmail=async (req,res)=>{
    let Result=await ForgotPasswordVerifyEmailService(req,UsersModel)
    res.status(200).json(Result)
}


//Step-02// Verify OTP
exports.ForgotPasswordVerifyOTP=async (req,res)=>{
    let Result=await ForgotPasswordVerifyOtpService(req,OTPSModel)
    res.status(200).json(Result)
}


//Step-03
exports.CreateNewPassword=async (req,res)=>{
    let Result=await CreateNewPasswordService(req,UsersModel,OTPSModel)
    res.status(200).json(Result)
}






//Recover Password
//Step-01//
exports.RecoverPasswordVerifyEmail=async (req,res)=>{
    let Result=await RecoverPasswordVerifyEmailService(req,UsersModel)
    res.status(200).json(Result)
}

//Step-02
exports.ResetPassword=async (req,res)=>{
    let Result=await ResetPasswordService(req,UsersModel,ResetTokenModel)
    res.status(200).json(Result)
}




//Follow User
exports.FollowUser=async (req, res) => {
    let Result=await FollowService(req,UsersModel)
    res.status(200).json(Result)
}


//Unfollow User
exports.UnfollowUser=async (req, res) => {
    let Result=await UnfollowService(req,UsersModel)
    res.status(200).json(Result)
}



/*-------------------------------------------Friend Related --------------------------------------------------------------------*/
/*-------------------------------------------Friend Related --------------------------------------------------------------------*/

//Add Friend
exports.AddCancelFriendRequest=async (req, res) => {
    let Result=await AddCancelFriendRequestService(req,UsersModel)
    res.status(200).json(Result)
}


//Confirm Friend Request
exports.ConfirmFriendRequest=async (req, res) => {
    let Result=await ConfirmFriendRequestService(req,UsersModel)
    res.status(200).json(Result)
}


//Delete Friend Request
exports.DeleteFriendRequest=async (req, res) => {
    let Result=await DeleteFriendRequestService(req,UsersModel)
    res.status(200).json(Result)
}


//Unfriend User
exports.UnfriendUser=async (req, res) => {
    let Result=await UnfriendService(req,UsersModel)
    res.status(200).json(Result)
}



//Get Followers
exports.GetFollowers=async (req, res) => {
    let JoinStage ={$lookup: {from: "users", localField: "followers", foreignField: "_id", as: "Followers"}};
    let Projection = {$project:{_id:1, username:1, email:1, followers:1, Followers:1 }};
    let Result=await DetailsService(req,UsersModel,JoinStage,Projection);
    res.status(200).json(Result)
}


//Get Following
exports.GetFollowing=async (req, res) => {
    let JoinStage ={$lookup: {from: "users", localField: "following", foreignField: "_id", as: "Following"}};
    let Projection = {$project:{_id:1, username:1, email:1, following:1, Following:1 }};
    let Result=await DetailsService(req,UsersModel,JoinStage,Projection);
    res.status(200).json(Result)
}



//Get Friend Lists
exports.GetFriends=async (req, res) => {
    let JoinStage ={$lookup: {from: "users", localField: "friends", foreignField: "_id", as: "Friends"}};
    let Projection = {$project:{_id:1, username:1, email:1, friends:1, Friends:1 }};
    let Result=await GetFriendsService(req,UsersModel,JoinStage,Projection);
    res.status(200).json(Result)
}



//Get Friend Lists
exports.GetFriendRequests=async (req, res) => {
    let JoinStage ={$lookup: {from: "users", localField: "friendRequests", foreignField: "_id", as: "FriendRequests"}};
    let Projection = {$project:{_id:1, username:1, email:1, friendRequests:1, FriendRequests:1 }};
    let Result=await GetFriendRequestService(req,UsersModel,JoinStage,Projection);
    res.status(200).json(Result)
}