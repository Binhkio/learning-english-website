const express = require('express')
const Router = express.Router()
const auth = require('../middlewares/authenticate')
const lessonValidate = require('../validations/lesson')
const validationMiddleware = require('../middlewares/validate')
const lessonController = require('../controllers/lesson')

Router.post('/', auth.currentUserAuth, validationMiddleware(lessonValidate.lessonRequest()), lessonController.storeLessons)
Router.post('/get-info', auth.currentUserAuth, validationMiddleware(lessonValidate.lessonGetInfoRequest()) ,lessonController.getLesson)
Router.post('/delete', auth.adminAuth, validationMiddleware(lessonValidate.lessonDeleteRequest()) ,lessonController.deleteLesson)

module.exports = Router
