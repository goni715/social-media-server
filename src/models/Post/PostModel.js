const  mongoose=require('mongoose');


const PostSchema = mongoose.Schema(
    {
        userId:{ type: mongoose.Schema.Types.ObjectId, required: true },
        desc: {type:String},
        image:{type:String},
        likes: [
            { type: mongoose.Schema.Types.ObjectId}
        ],
        comments: [
            {
                comment: String,
                reply:[
                   {
                       replyBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                       text:{type:String},
                       createdAt: {type: Date, default: new Date()}
                   }
                ],
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
                createdAt: {type: Date, default: new Date()}
            }
        ],
   },
    { timestamps: true, versionKey:false},
);



const PostModel=mongoose.model('posts',PostSchema);
module.exports=PostModel

