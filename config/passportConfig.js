const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrpyt = require("bcrypt");
const User = require('../models/user.model');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, async function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { status: 'failed', invalid: "username" }); }
            let validPassword = await bcrpyt.compare(password, user.password);
            if (!validPassword) { return done(null, false, { status: 'failed', invalid: "password" }); }
            return done(null, user, { status: 'success', });
        });
    }
));

var opts = {
    jwtFromRequest: ExtractJwt.fromHeader('token'),
    secretOrKey: process.env.SECRET,
}
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) { return done(err, false); }
        if (user) { return done(null, user); }
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


module.exports = passport;