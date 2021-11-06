const express = require("express");
const cors = requrie("cors");
const passport = require("passport");
const TwitchStrategy = requrie("passport-twitch");
const config = require("../config");

let user = {};

passport.serializeUser((user, callback) => {
    callback(null, user);
});

passport.deserializeUser((user, callback) => {
    callback(null, user);
});

// Twitch strategy
passport.use(new TwitchStrategy({

    clientID: config.TWITCH.clientID,
    clientSecret: config.TWITCH.clientSecret,
    callbackURL: config.callback
},
(accessToken, refreshToken, profile, callback) => {
    console.log(JSON.stringify(profile));
    user = { ...profile };
    return callback(null, profile);
}));

const app = express();
app.use(cors());
app.use(passport.initialize());

app.get("/auth/twitch/", passport.authenticate("twitch.js"))
app.get(config.TWITCH.callback, passport.authenticate("twitch.js"),
    (req,res) =>{
        res.redirect("/");
    });

app.get("/user", (req, res) => {
    console.log("getting user data");
    res.send(user);
});

app.get("auth/logout", (req, res) => {
    console.log("Logging out!");
    user = {};
    res.redirect("/");
});

app.listen(5000);

// https://www.youtube.com/watch?v=A23O4aUftXk