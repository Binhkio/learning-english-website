const express = require('express');
const router = express.Router();

// import middleware
const validationMiddleware = require('../middlewares/validate')
// import validate rule
const { authValidate } = require('../validations/auth')

// import controller
const authController = require('../controllers/auth')

router.post('/login', validationMiddleware(authValidate.loginValidate()), authController.login)
router.post('/register', validationMiddleware(authValidate.registerValidate()), authController.register);
router.post('/register-admin', validationMiddleware(authValidate.registerValidate()), authController.registerAdmin);



module.exports = router;
