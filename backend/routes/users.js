const express = require('express');
const passport = require('passport');
const router = express.Router();

// Routage pour l'authentification avec Twitch
router.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

router.get('/auth/twitch/callback',passport.authenticate('twitch', { failureRedirect: 'http://localhost:5173/' }),
    (req, res) => {
        
        console.log('Authentification réussie !');
        console.log(req.user);
        // L'utilisateur est authentifié avec succès
        res.redirect({user: req.user},'http://localhost:5173/'); // Redirigez vers la page du forum ou toute autre page souhaitée
    }
);

// Exemple de vérification de l'authentification pour accéder à certaines pages
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('http://localhost:5173/');
}

router.get('/', (req, res) => {
    res.send('Accueil');
});

router.get('/forum', ensureAuthenticated, (req, res) => {
    res.send('Bienvenue sur le forum');
});

module.exports = router;
