const express = require('express');
const session = require('express-session');

const path = require('path');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
var request        = require('request');

const passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

require('dotenv').config();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const TWITCH_CLIENT_ID= process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET= process.env.TWITCH_SECRET;
const SESSION_SECRET=process.env.CALLBACK_URL;
const CALLBACK_URL='http://localhost:3000/users/auth/twitch/callback';


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration de session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
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
});

module.exports = app;
