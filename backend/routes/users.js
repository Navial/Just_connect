const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

const router = express.Router();

// Remplacez les valeurs suivantes par celles de votre compte Riot Games Developer
const clientID = 'RGAPI-e4084b9b-b6d1-4086-8235-ddd67067c91a';
const clientSecret = 'RGAPI-e4084b9b-b6d1-4086-8235-ddd67067c91a';
const callbackURL = 'http://localhost:3000/auth/riot/callback';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'User' });
});


// Configuration de la stratégie OAuth2
passport.use('riot', new OAuth2Strategy({
  authorizationURL: 'https://auth.riotgames.com/api/v1/authorization',
  tokenURL: 'https://auth.riotgames.com/api/v1/token',
  clientID,
  clientSecret,
  callbackURL,
}, (accessToken, refreshToken, profile, done) => {
  // Vous pouvez gérer l'authentification de l'utilisateur ici
  // Par exemple, enregistrer l'utilisateur dans votre base de données ou créer un compte
  return done(null, profile);
}));

// Middleware d'authentification
router.use(passport.initialize());

// Redirection vers Riot Games pour l'authentification
router.get('/auth/riot',
  passport.authenticate('riot', { scope: 'openid' })
);




// Callback après l'authentification
router.get('/auth/riot/callback',
  passport.authenticate('riot', { failureRedirect: '/' }),
  (req, res) => {
    // Rediriger l'utilisateur vers votre application React avec le jeton d'accès
    res.redirect('http://localhost:3000/?accessToken=' + req.user.accessToken);
  }
);

module.exports = router;
