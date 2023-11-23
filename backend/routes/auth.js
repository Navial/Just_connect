const express = require('express');

const router = express.Router();


router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json("Déconnecté avec succès");
});


module.exports = router;