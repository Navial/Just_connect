const express = require('express');
const passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request = require('request');

const TWITCH_CLIENT_ID= process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET= process.env.TWITCH_SECRET;
const SESSION_SECRET=process.env.CALLBACK_URL;
const CALLBACK_URL='http://localhost:3000/twitch/auth/callback';


const router = express.Router();

// Routage pour l'authentification avec Twitch
router.get('/auth', passport.authenticate('twitch', { scope: 'user_read' }));

router.get('/auth/callback',passport.authenticate('twitch', { failureRedirect: 'http://localhost:5173/'}),
    (req, res) => {
        
        console.log('Authentification réussie !');
        console.log(req.user);
        var encoded = btoa(JSON.stringify(req.user))

        // L'utilisateur est authentifié avec succès
        res.redirect('http://localhost:5173/?user='+encoded); // Redirigez vers la page du forum ou toute autre page souhaitée

    }
);

// Exemple de vérification de l'authentification pour accéder à certaines pages
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('http://localhost:5173/');
}

//auth
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

  

module.exports = router;
