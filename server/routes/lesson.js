const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/authenticate')
const lessonValidate = require('../validations/lesson')
const validationMiddleware = require('../middlewares/validate')
const lessonController = require('../controllers/lesson')

Router.post('/', auth.authenticate, validationMiddleware(lessonValidate.lessonRequest()), lessonController.storeLessons)
Router.post('/get-info', auth.authenticate, validationMiddleware(lessonValidate.lessonGetInfoRequest()) ,lessonController.getLesson)

module.exports = Router
