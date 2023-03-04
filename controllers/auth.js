import bcrypt from "bcrypt";

import User from "../models/User.js";


// registser user
export const register = async (req, res) => {
    try {
        console.log("in register");

        let {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        let salt = await bcrypt.genSalt();//returns a dynamic string "fweafewafweaf"
        let passwordHash = await bcrypt.hash(password, salt)  // muthu123, "fweafewafweaf" = fawfeaw5634fv423q43fff

        let newUser = new User(
            {
                firstName,
                lastName,
                email,
                password: passwordHash,//fawfeaw5634fv423q43fff
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile: Math.floor(Math.random() * 10000),
                impressions: Math.floor(Math.random() * 10000)

            })

        await newUser.save()
        res.status(201).json(newUser)

    } catch (error) {
        console.log("error:", error.message);
        res.status(500).json({ error: error.message })
    }
};