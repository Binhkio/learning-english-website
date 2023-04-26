const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/authenticate')
const quizValidate = require('../validations/quiz')
const validationMiddleware = require('../middlewares/validate')
const quizController = require('../controllers/quiz')

Router.post('/create', auth.authenticate, validationMiddleware(quizValidate.quizCreateRequest()) ,quizController.createQuiz)
Router.post('/update', auth.authenticate, validationMiddleware(quizValidate.quizUpdateRequest()) ,quizController.updateQuiz)
Router.post('/delete', auth.authenticate, validationMiddleware(quizValidate.quizDeleteRequest()) ,quizController.deleteQuiz)
Router.get('/get-all', auth.authenticate, validationMiddleware(quizValidate.quizzesGetRequest()) ,quizController.getAllQuizzes)
Router.post('/get-info', auth.authenticate, validationMiddleware(quizValidate.quizGetRequest()) ,quizController.getOneQuiz)

module.exports = Router
