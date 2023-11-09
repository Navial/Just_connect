var express = require('express');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const clientID = 'VOTRE_CLIENT_ID';
const clientSecret = 'VOTRE_CLIENT_SECRET';
const callbackURL = 'http://localhost:3000/auth/riot/callback';


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
app.use(passport.initialize());

// Redirection vers Riot Games pour l'authentification
app.get('/auth/riot',
  passport.authenticate('riot', { scope: 'openid' })
);

// Callback après l'authentification
app.get('/auth/riot/callback',
  passport.authenticate('riot', { failureRedirect: '/' }),
  (req, res) => {
    // Rediriger l'utilisateur vers votre application React avec le jeton d'accès
    res.redirect('http://localhost:3000/?accessToken=' + req.user.accessToken);
  }
);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur d'authentification en cours d'exécution sur le port ${port}`);
});

module.exports = router;
