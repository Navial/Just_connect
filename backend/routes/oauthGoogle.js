const express = require("express");
const router = express.Router();
const User = require("../models/users");
const mongoose = require("mongoose");
const { verify } = require("../utils/verifyGoogleToken");

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

module.exports = router;
