import User from "../models/User";


// Read
export const getUser = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {

    } catch (error) {
        res.status().json({ msg: error.message })
    }
}