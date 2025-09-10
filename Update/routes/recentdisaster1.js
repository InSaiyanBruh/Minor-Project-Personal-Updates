const express = require('express');
const router = express.Router();

router.get('/RecentDisaster1', (req, res) => {
  res.render('RecentDisaster1');
});

module.exports = router;
