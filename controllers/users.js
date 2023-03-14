import User from "../models/User.js";


// Read
export const getUser = async (req, res) => {
    try {
        console.log("in get user");
        let { id } = req.params;
        let user = await User.findById(id);
        user.password = undefined;
        console.log("single_user:", user);
        res.status(200).send(user)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        let { id } = req.params;

        let user = await User.findById(id);//user details
        //friends array
        let friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        let formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        });
        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        let { id, friendId } = req.params;
        let user = await User.findById(id);  //get user details from db
        console.log("user:", user);
        let friend = await User.findById(friendId);
        console.log("friend:", friend);

        if (user.friends.includes(friendId)) {
            //remove friend
            user.friends = user.friends.filter((frd_id) => frd_id !== friendId); //returns modified array
            friend.friends = friend.friends.filter((frd_id) => frd_id !== id);
        } else {
            //add friend 
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}
