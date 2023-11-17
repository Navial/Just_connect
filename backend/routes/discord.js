const  express = require('express');
const  router = express.Router();
const axios = require('axios')




const CLIENT_ID = '1174682089338183772'
const CLIENT_SECRET = '-q2j9dJchOJ2KcZAhKZpMAy0PAMY22qr'
const REDIRECT_URI = "http://localhost:3000/discord/callback"


var access_token;


router.get('/login', async function(req, res, next) {
    const redirect_url = `https://discord.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify%20guilds&redirect_uri=${REDIRECT_URI}&prompt=consent`
    res.redirect(redirect_url);
  });



router.get("/callback", async (request, res) => {
    const code = request.query["code"]
    const response = await axios.post('https://discord.com/api/oauth2/token',
        new URLSearchParams({
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'code': code
        }),
        {
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        access_token = response.data.access_token;
        res.redirect('http://localhost:5173/userDiscord');
})


router.get('/userInformations', async (req, res) => {
    try {
        if (!access_token) {
            console.log("Accès token manquant, connectez-vous avec Discord");
            res.redirect("login");
            return;
        }

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
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



router.get('/userGuilds', async (req, res) => {
    if (!access_token) {
        console.log("Accès token manquant, connectez-vous avec Discord");
        res.redirect("login");
        return;
    }

    try {
        const userResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const userGuilds = userResponse.data;

        res.json(userGuilds);
    } catch (error) {
        console.error('Erreur lors de la récupération des serveurs de l\'utilisateur :', error.response ? error.response.data : error.message);
        res.send('Erreur lors de la récupération des serveurs de l\'utilisateur.');
    }
});




module.exports =  router;