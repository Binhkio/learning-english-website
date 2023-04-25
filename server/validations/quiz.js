const { check } = require('express-validator')

const quizCreateRequest = () => [
    check('_id', 'User is invalid').not().isEmpty(),
    check('data.name', 'Quiz names is required').notEmpty(),
    check('data.lessons', 'Lesson is required').isArray({min:1}),
]


const quizValidate = {
    quizCreateRequest: quizCreateRequest,
}

module.exports = quizValidate
