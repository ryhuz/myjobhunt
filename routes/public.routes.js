const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const User = require('../models/user.model');

router.post("/register", async (req, res) => {
    let { username, password, email,
        firstname, lastname } = req.body
    let exists = await User.find({ username: username })
    if (exists.length) {
        console.log(exists)
        return res.status(400).json({ error: 'exists' })
    } else {
        try {
            let passwordHash = await bcrpyt.hash(password, 10)

            let newUser = new User({
                username,
                password: passwordHash,
                email,
                firstname,
                lastname,
            })
            newUser.save()

            return res.status(200).json({ message: 'good' });
        } catch (e) {
            console.log(e)
            return res.status(400).json({ error: e })
        }
    }
})

module.exports = router;