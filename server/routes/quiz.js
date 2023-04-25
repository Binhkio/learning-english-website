const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/authenticate')
const quizValidate = require('../validations/quiz')
const validationMiddleware = require('../middlewares/validate')
const quizController = require('../controllers/quiz')

Router.post('/create', auth.authenticate, validationMiddleware(quizValidate.quizCreateRequest()) ,quizController.createQuiz)

module.exports = Router
