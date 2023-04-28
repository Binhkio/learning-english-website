const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/authenticate');

router.post('/user-data', auth.authenticate, userController.getCurrentUser);
router.post('/bookmark/quiz', auth.authenticate, userController.updateQuizToUser);
router.post('/bookmark/lesson', auth.authenticate, userController.updateLessonToUser);
router.post('/change-password', auth.authenticate, userController.changePassword)

module.exports = router;
