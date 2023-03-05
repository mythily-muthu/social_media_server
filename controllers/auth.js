import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

//loggin

export let login = async (req, res) => {
    try {
        let { email, password } = req.body;

        //email
        let user = await User.findOne({ email: email }); //it returns user object
        console.log("user Details:", user);// if user {details} else null
        if (!user) return res.status(400).json({ msg: "User does not exist" })// (!user) => when email field is empty

        //password
        const isMatch = await bcrypt.compare(password, user.password) // returns boolean
        console.log("password match:", isMatch);
        if (!isMatch) return res.status(400).json({ msg: "invalid credentials" })

        //token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; // need to remove password from user object not in db;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}