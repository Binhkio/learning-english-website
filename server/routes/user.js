const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middlewares/authenticate');

router.post('/user-data', auth.currentUserAuth, userController.getCurrentUser);
router.post('/bookmark/quiz', auth.currentUserAuth, userController.updateQuizToUser);
router.post('/bookmark/lesson', auth.currentUserAuth, userController.updateLessonToUser);
router.post('/change-password', auth.currentUserAuth, userController.changePassword);

module.exports = router;
