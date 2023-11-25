const express = require('express');
const passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var request = require('request');
const mongoose = require("mongoose");
const TwitchUser = require("../models/users");

const TWITCH_CLIENT_ID= process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET= process.env.TWITCH_SECRET;
const SESSION_SECRET=process.env.CALLBACK_URL;
const CALLBACK_URL='http://localhost:3000/twitch/auth/callback';


const router = express.Router();

// Routage pour l'authentification avec Twitch
router.get('/auth', passport.authenticate('twitch', { scope: 'user_read' }));

router.get('/auth/callback',passport.authenticate('twitch', { failureRedirect: 'http://localhost:5173/'}),
    async (req, res) => {
        
      let user = await TwitchUser.findOne({ id: req.user.data[0].id });

      if (!user) {
        let user = new TwitchUser({
          id: req.user.data[0].id,
          email: req.user.data[0].email,
          profilePicture: req.user.data[0].profile_image_url,
          login: req.user.data[0].login,
          display_name: req.user.data[0].display_name,
          created_at: req.user.data[0].created_at
          });
  
        // l'inserer dans la db
        await user.save();
      }

        console.log('Authentification réussie !');
        console.log(req.user);
        var encoded = btoa(JSON.stringify(req.user))
        
        res.cookie("test","test");
        // L'utilisateur est authentifié avec succès
        res.redirect('http://localhost:5173/twitch/'); // Redirigez vers la page du forum ou toute autre page souhaitée

    }
);

router.get('/userInformations', async (req, res, next) => {
  console.log(req.session);
  if (!req.session.passport) {
    return res.status(401).json({ error: "Accès token invalide, connectez-vous avec Twitch" });
  }
  else{
    return res.status(200).json(req.session.passport.user.data[0]);
  }
});

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
        console.log(accessToken);
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
