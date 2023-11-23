
/*Author : Agbassah Steven
  Date : octobre / novembre 2023

  Cette page représente un router réalisé en express et permet de gérer toute l'authentification via Discord, mais également la récupération 
  de certaines informations une fois que l'authentification a été réalisée

  Attention, pour le bon fonctionnement de ce router, assurez vous d'avoir créé un fichier .env à la racine du projet : référé vous au README du projet
*/
const express = require('express');
const router = express.Router();
const axios = require('axios');



const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
const DISCORD_API_URL = 'https://discord.com/api';


/* 
Route correspondant à /discord/login permettant d'obtenir un code pour avoir un jeton d'authentification discord


*/
router.post('/login', async (req, res) => {
    const redirect_url = `${DISCORD_API_URL}/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify%20guilds&redirect_uri=${REDIRECT_URI}&prompt=consent`; //le scope permet de délimiter les ressources de l'api discord auxquelles on aura accès avec le token
    res.status(200).json({ redirectUrl: redirect_url });
  });



/* 
Route correspondant à /discord/callback, c'est la route surlaquelle on est redirigé après s'être authentifié avec discord grâce à /discord/login
elle permet de nous donner  un token en échange d'un code d'authentification obtenu dans /discord/login

*/
router.get('/callback', async (req, res, next) => {
    try {
        const code = req.query["code"];

        if (!code) {
            return res.status(400).json({ error: "Le code d'autorisation est manquant." });
        }

        const response = await axios.post(
            `${DISCORD_API_URL}/oauth2/token`,
            new URLSearchParams({
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'grant_type': 'authorization_code',
                'redirect_uri': REDIRECT_URI,
                'code': code
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );


        if (response.data.error) {
            console.error("Erreur lors de l'échange du code contre un jeton d'accès:", response.data.error_description);
            return res.status(response.status || 500).json({ error: response.data.error_description });
        }

        req.session.access_token = response.data.access_token;
        req.session.logged = true;
        res.redirect('http://localhost:5173/userDiscord')
        
    } catch (error) {
        console.error("Erreur lors du traitement du callback:", error.message);
        res.status(500).json({ error: "Erreur lors du traitement du callback." });
    }
});


/* 
Route permettant d'obtenir des informations de base sur l'utilisateur discord, après vérification de la présence d'un token d'authentification discord

*/
router.get('/userInformations', async (req, res, next) => {
    console.log(req.session)
    try {
        if (!req.session.access_token) {
            return res.status(401).json({ error: "Accès token manquant, connectez-vous avec Discord" });
        }

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${req.session.access_token}`,
            },
        });

        const userInfo = userResponse.data;
        res.json(userInfo);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: "Erreur lors de la récupération des informations de l'utilisateur.",
            message: error.message,
        });
    }
});


/* 
Route permettant d'obtenir des informations de base sur les serveurs de 
l'utilisateur discord, après vérification de la présence d'un token d'authentification discord

*/

router.get('/userGuilds', async (req, res, next) => {
    try {
        if (!req.session.access_token) {
            return res.status(401).json({ error: "Accès token manquant, connectez-vous avec Discord" });
        }

        const userResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${req.session.access_token}`,
            },
        });

        const userGuilds = userResponse.data;
        res.json(userGuilds);
    } catch (error) {
        console.error('Erreur lors de la récupération des serveurs de l\'utilisateur :', error.response ? error.response.data : error.message);
        res.status(500).json({
            error: "Erreur lors de la récupération des serveurs de l'utilisateur.",
            message: error.message,
        });
    }
});





module.exports =  router;