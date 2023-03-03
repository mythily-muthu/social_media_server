let mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, min: 2, max: 40 },
        lastName: { type: String, required: true, min: 2, max: 40 },
        email: { type: String, required: true, max: 40, unique: true },
        password: { type: String, required: true, min: 2, max: 40, unique: true },
        picturePath: { type: String, default: [] },
        locatiion: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
)
let User = mongoose.model("User", UserSchema)
module.exports = User