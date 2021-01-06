const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const User = require('../models/user.model');
const passport = require('../config/passportConfig')

router.put("/checkexist", async (req, res) => {
    let { username } = req.body
    let exists = await User.find({ username })
    if (exists.length) {
        return res.status(200).json({ exists: true })
    } else {
        return res.status(200).json({ exists: false })
    }
})

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

router.post("/login", function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (info.status === 'success') {
            req.login(user, { session: false }, err => {
                if (err) { return next(err); }

                const body = { ref: user._id };
                const token = jwt.sign({ data: body }, process.env.SECRET, { expiresIn: 846000 })
                return res.status(200).json({ status: info.status, token: token })
            })
        } else {
            return res.status(401).json({ invalid: info.invalid })
        }

    })(req, res, next);
});

router.get("/verify_token", function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) { return next(err); }
        if (info.name === 'TokenExpiredError'){
            return res.status(401).json({ invalid: 'expired' })
        }
        if (info.status === 'success') {
            return res.status(200).json({ status: info.status })
        } else {
            return res.status(401).json({ invalid: info.invalid })
        }

    })(req, res, next);
});
module.exports = router;