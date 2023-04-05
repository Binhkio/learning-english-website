var express = require('express');
var router = express.Router();

// LOGIN
router.post('/login', function(req, res, next) {
    res.send('User login');
});

// LOGOUT
router.post('/logout', function(req, res, next) {
    res.send('User logout');
});


module.exports = router;
