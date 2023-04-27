const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.post('/user-data', userController.getCurrentUser)
router.post('/bookmark/quiz', userController.updateQuizToUser)
router.post('/bookmark/lesson', userController.updateLessonToUser)

module.exports = router;
