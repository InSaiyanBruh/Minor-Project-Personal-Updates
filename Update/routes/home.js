var express = require('express');
var router = express.Router();

// GET /home
router.get('/', function(req, res) {
  console.log("Rendering home with email:", req.query.email);
  res.render('home', { email: req.query.email || "Guest" });
});

module.exports = router;
