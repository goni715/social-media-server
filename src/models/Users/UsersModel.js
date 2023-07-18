const  mongoose=require('mongoose');


const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        profilePicture: {
            type: String,
        },
        coverPicture: {
            type: String,
        },
        about: String,
        livesIn: String,
        worksAt: String,
        relationship: String,
        followers: [
            { type: mongoose.Schema.Types.ObjectId}
        ] ,
        following: [
            { type: mongoose.Schema.Types.ObjectId}
        ],
        friendRequests: [
            { type: mongoose.Schema.Types.ObjectId}
        ],
        friends: [
            { type: mongoose.Schema.Types.ObjectId}
        ],
        location: String,
        occupation: String,
        viewedProfile: Number,
    },
    { timestamps: true, versionKey:false},
);



const UsersModel=mongoose.model('users',UserSchema);
module.exports=UsersModel

