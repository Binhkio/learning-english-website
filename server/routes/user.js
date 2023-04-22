const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.post('/user-data', userController.getCurrentUser)

module.exports = router;
