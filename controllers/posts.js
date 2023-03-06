import Post from "../models/post.js";
import User from "../models/User.js";

//create
export const createPost = async (req, res) => {
    try {
        let { userId, description, picturePath } = req.body;
        //user
        let user = await User.findById(userId);
        //post
        let newPost = new Post(
            {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                locatiion: user.locatiion,
                description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                comments: []
            });
        await newPost.save();
        let post = await Post.find();
        res.status(201).json(post); //returns a post
    } catch (error) {
        res.status(409).json({ msg: error.message });
    }
};

//read
export const getFeedPosts = async (req, res) => {
    try {
        let post = await Post.find();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {

        const { userId } = req.body;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

