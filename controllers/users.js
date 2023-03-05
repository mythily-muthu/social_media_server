import User from "../models/User.js";


// Read
export const getUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id);
        user.password = undefined;
        res.status(200).send(user)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id);

        let friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        let formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        });

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status().json({ msg: error.message })
    }
}