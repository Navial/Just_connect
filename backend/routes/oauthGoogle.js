const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongoose = require("mongoose");
const { verify } = require("../utils/verifyGoogleToken");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = require("../utils/config");
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

router.post("/login", async (req, res) => {
  // generate a url that asks permissions for Calendar scopes
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar",
  ];

  const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.status(200).json({ redirectUrl });
});

/* GET home page. */
router.post("/", async (req, res, next) => {
  const accessToken = req.body.accessToken;

  try {
    const tokeninfo = await verify(accessToken);
    let user = await User.findOne({ idGoogle: tokeninfo.sub });

    console.log({ user });
    console.log({ tokeninfo });
    //Si il exisits pas on le cree
    if (!user) {
      user = new User({
        idGoogle: tokeninfo.sub,
        email: tokeninfo.email,
        profilePicture: tokeninfo.picture,
      });

      // l'inserer dans la db
      await user.save();
    }

    res.json({
      email: tokeninfo.email,
      name: tokeninfo.name,
      picture: tokeninfo.picture,
      email_verified: tokeninfo.email_verified,
      sub: tokeninfo.sub,
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'Access Token:", error);
    res.status(401).json({ error: "Invalid Access Token" });
  }
});

router.get("/callback", async (req, res, next) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res
        .status(400)
        .json({ error: "Le code d'autorisation est manquant." });
    }

    // Échanger le code contre un token d'accès
    // This will provide an object with the access_token and refresh_token.
    // Save these somewhere safe so they can be used at a later time.
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log({ tokens });

    const accessToken = tokens.access_token;

    // Stocker des informations dans la session
    req.session.logged = true;
    req.session.access_token = tokens.access_token;

    res.redirect("http://localhost:5173/userGoogle");
  } catch (error) {
    console.error("Erreur lors du traitement du callback:", error.message);
    res.status(500).json({ error: "Erreur lors du traitement du callback." });
  }
});

router.get("/userInfo", (req, res) => {


  console.log(req.session)
  
});

module.exports = router;
