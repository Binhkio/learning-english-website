const { check } = require('express-validator')

const lessonRequest = () => [
    check('_id', 'User is invalid').not().isEmpty(),
    check('data.name', 'Lesson names is required').notEmpty(),
    check('data.image', 'Image is required').notEmpty(),
]

const lessonGetInfoRequest = () => [
    check('ids', 'List lesson is invalid').notEmpty()
]

const lessonValidate = {
    lessonRequest: lessonRequest,
    lessonGetInfoRequest: lessonGetInfoRequest
}

module.exports = lessonValidate
