import Jwt from "jsonwebtoken";


export let verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token) {
            return res.status(403).send("access denied")
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimleft();
        }

        const verified = Jwt.verify(token, process.env.JWT_SECRET)
        console.log("verified:", verified.id);
        // if (req.params.id === verified.id) {
        //     req.user = verified;
        //     next();
        // } else {
        //     return res.status(403).send("access denied")
        // }
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}