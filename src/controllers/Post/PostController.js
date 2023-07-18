const PostModel = require("../../models/Post/PostModel");
const CreatePostService = require("../../services/post/CreatePostService");
const GetPostByIDService = require("../../services/post/GetPostByIDService");
const UpdatePostService = require("../../services/post/UpdatePostService");
const DeletePostService = require("../../services/post/DeletePostService");
const GetTimelinePostsService = require("../../services/post/GetTimelinePostsService");
const UsersModel = require("../../models/Users/UsersModel");
const LikeDislikePostService = require("../../services/post/LikeDislikePostService");
const GetUserPostsService = require("../../services/post/GetUserPostsService");
const GetLikesService = require("../../services/post/GetLikesPostService");
const CommentPostService = require("../../services/post/CommentPostService");
const ReplyPostService = require("../../services/post/ReplyPostService");

exports.CreatePost=async (req, res) => {
    let Result=await CreatePostService(req,PostModel)
    res.status(200).json(Result)
}


//Get Single Post
exports.GetPost=async (req, res) => {
    let Result=await GetPostByIDService(req,PostModel);
     res.status(200).json(Result)
}


//Update a Post
exports.UpdatePost=async (req, res) => {
    let Result=await UpdatePostService(req,PostModel)
    res.status(200).json(Result)
}



//Delete Single Post
exports.DeletePost=async (req, res) => {
    let Result=await DeletePostService(req,PostModel)
    res.status(200).json(Result)
}


//Like-DislikePost
exports.LikeDislikePost=async (req, res) => {
    let Result=await LikeDislikePostService(req,PostModel)
    res.status(200).json(Result)
}



//Get A User Post
exports.GetUserPosts=async (req, res) => {
    let Result=await GetUserPostsService(req,PostModel);
    res.status(200).json(Result)
}


//Get Timeline Posts
exports.GetTimelinePosts=async (req, res) => {
    let Result=await GetTimelinePostsService(req,PostModel, UsersModel)
    res.status(200).json(Result)
}


//Get Likes

exports.GetLikes=async (req, res) => {
    let Result=await GetLikesService(req,PostModel);
    res.status(200).json(Result)
}



//Comment to the post
exports.CommentPost=async (req, res) => {
    let Result=await CommentPostService(req,PostModel);
    res.status(200).json(Result)
}


//Comment to the post
exports.ReplyPost=async (req, res) => {
    let Result=await ReplyPostService(req,PostModel);
    res.status(200).json(Result)
}