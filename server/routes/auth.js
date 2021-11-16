var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get("/auth/twitch", passport.authenticate("twitch"));
router.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    console.log(res);
    res.redirect("/");
});