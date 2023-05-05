const express = require('express');
const Router = express.Router();
const auth = require('../middlewares/authenticate');
const quizValidate = require('../validations/quiz');
const validationMiddleware = require('../middlewares/validate');
const quizController = require('../controllers/quiz');

Router.post('/create', auth.currentUserAuth, validationMiddleware(quizValidate.quizCreateRequest()), quizController.createQuiz);
Router.post('/update', auth.currentUserAuth, validationMiddleware(quizValidate.quizUpdateRequest()), quizController.updateQuiz);
Router.post('/delete', auth.currentUserAuth, validationMiddleware(quizValidate.quizDeleteRequest()), quizController.deleteQuiz);
Router.get('/get-all', auth.currentUserAuth, validationMiddleware(quizValidate.quizzesGetRequest()), quizController.getAllQuizzes);
Router.post('/get-info', auth.currentUserAuth, validationMiddleware(quizValidate.quizGetRequest()), quizController.getOneQuiz);

module.exports = Router;
