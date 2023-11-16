const  express = require('express');
const  router = express.Router();
const axios = require('axios')



const CLIENT_ID = '1174682089338183772'
const CLIENT_SECRET = '-q2j9dJchOJ2KcZAhKZpMAy0PAMY22qr'
const REDIRECT_URI = "http://localhost:3000/discord/api/callback"


router.get('/login', async function(req, res, next) {
    const redirect_url = `https://discord.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify&redirect_uri=${REDIRECT_URI}&prompt=consent`
    res.redirect(redirect_url);
  });



router.get("/api/callback", async (request, res) => {
    const code = request.query["code"]
    const resp = await axios.post('https://discord.com/api/oauth2/token',
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
    res.send('Logged In: ' + JSON.stringify(resp.data));
})


module.exports =  router;