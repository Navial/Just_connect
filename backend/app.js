const express = require('express');
const session = require('express-session');
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");

var path = require("path");
const cors = require('cors');
var request = require('request');
const passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

const { MONGODB_URI } = require("./utils/config");
require('dotenv').config();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const discordRouter = require('./routes/discord');
const authRouter = require('./routes/auth');

const TWITCH_CLIENT_ID= process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET= process.env.TWITCH_SECRET;
const SESSION_SECRET=process.env.CALLBACK_URL;
const CALLBACK_URL='http://localhost:3000/users/auth/twitch/callback';


const app = express();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {

    maxAge: 3600000, 
},
}));

// Initialisation de passport
app.use(passport.initialize());
app.use(passport.session());


OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/helix/users',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'Bearer ' + accessToken
    }
  };

  request(options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// Configuration de la stratégie Twitch
passport.use('twitch', new OAuth2Strategy({
  authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
  tokenURL: 'https://id.twitch.tv/oauth2/token',
  clientID: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_SECRET,
  callbackURL: CALLBACK_URL,
  scope: ['user_read', 'user_subscriptions', 'user:read:email', 'channel:read:subscriptions'],
  state: true
},
function(accessToken, refreshToken, profile, done) {
  const userId = profile.id;
  const username = profile.login;
  const email = profile.email;

  // Securely store user profile in your DB
  // User.findOrCreate(..., function(err, user) {
  //   done(err, user);
  // });
  
  console.log(profile);
  done(null, profile);
}
));

// Méthodes pour sérialiser et désérialiser l'utilisateur dans la session
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/discord', discordRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('Error');

app.use(function (req, res, next) {
  next(createError(404));
})});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
