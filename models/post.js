import mongoose from 'mongoose';

let postSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, },
        firstName: { type: String, required: true, },
        lastName: { type: String, required: true, },
        locatiion: String,
        description: String,
        userPicturePath: String,
        picturePath: String,
        likes: { type: Map, of: Boolean, },
        comments: { type: Array, default: [], },
    },
    { timestamps: true }

)
let Post = mongoose.model("Post", postSchema)

export default Post
