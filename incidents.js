var express = require('express');
var router = express.Router();

// GET /incidents
router.get('/', function(req, res, next) {
  console.log("Incidents route hit ✅"); // debugging log
  res.render('incidents', { title: 'Recent Incidents' });
});

module.exports = router;
