const express = require('express');

const router = express.Router();



router.post('/logout', (req, res) => {
  console.log('logout avant' , req.session)

  req.session.destroy();

  console.log('logout' , req.session)
  
  res.status(200).json("Déconnecté avec succès");
});


module.exports = router;
