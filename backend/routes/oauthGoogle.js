const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongoose = require("mongoose");
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

const axios = require("axios");

router.post("/login", async (req, res) => {
  // generate a url that asks permissions for Calendar scopes
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
  ];

  const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.status(200).json({ redirectUrl });
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

router.get("/userInfo", async (req, res) => {
  const userToken = req.session.access_token;

  console.log({ userToken });

  try {
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const userInfo = userInfoResponse.data;
    res.json(userInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error.message
    );
    res.status(error.response?.status || 500).json({
      error:
        "Erreur lors de la récupération des informations de l'utilisateur.",
      message: error.message,
    });
  }
});

router.get("/userCalendar", async (req, res) => {
  const userToken = req.session.access_token;

  console.log({ userToken });

  try {
    const eventsResponse = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const events = eventsResponse.data.items;

    // Retourner la liste complète
    console.log({ events });
    res.json(events);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des événements du calendrier:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Erreur lors de la récupération des événements du calendrier.",
      message: error.message,
    });
  }
});

module.exports = router;
