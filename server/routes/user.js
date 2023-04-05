var express = require('express');
var router = express.Router();

// REGISTER
router.post('/register', function(req, res, next) {
  res.send('Register user');
});

module.exports = router;
