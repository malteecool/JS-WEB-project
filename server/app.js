var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var config = require('../config');

var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');
var twitchStrategy = require("passport-twitch").Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(cookieSession({secret:"somesecrettokenhere"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


passport.use(new twitchStrategy({
  clientID: "wcvvgcuuc6159awkjtf8m67r8tx1u9",
  clientSecret: "pjqzwy6cmpysxbwhb0h102vgu2odoj",
  callbackURL: "http://127.0.0.1:3000/auth/twitch/callback",
  scope: "user_read"
},
function(accessToken, refreshToken, profile, done) {
  // Suppose we are using mongo..
  console.log(profile.id);
  /*User.findOrCreate({ twitchId: profile.id }, function (err, user) {
    return done(err, user);
  });*/
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/*app.get("/", function (req, res) {
  res.render("index");
});*/

app.get("/auth/twitch", passport.authenticate("twitch"));
app.get("/auth/twitch/callback", passport.authenticate("twitch", { failureRedirect: "/" }), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
