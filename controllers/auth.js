import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import User from "../models/User.routes";


// registser user
export let registser = async (req, res) => {
    try {

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

        let salt = await bcrypt.genSalt()
        let passwordHash = await bcrypt.hash(password, salt)

        let newUser = new User(
            {
                firstName,
                lastName,
                email,
                password: passwordHash,
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
        res.status(500).json({ error: error.message })
    }
}