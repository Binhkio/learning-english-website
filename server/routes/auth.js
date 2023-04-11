const express = require('express');
const router = express.Router();

// import middleware
const validationMiddleware = require('../middlewares/validate')
const auth = require('../middlewares/authenticate')
// import validate rule
const { authValidate } = require('../validations/auth')

// import controller
const authController = require('../controllers/auth')

router.post('/login', validationMiddleware(authValidate.loginValidate()), authController.login)
router.post('/register', validationMiddleware(authValidate.registerValidate()), authController.register);

// LOGOUT
router.post('/logout', function(req, res, next) {
    res.send('User logout');
});


module.exports = router;
