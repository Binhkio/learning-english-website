const { check } = require('express-validator');

const quizCreateRequest = () => [
    check('_id', 'User is invalid').not().isEmpty(),
    check('data.name', 'Quiz names is required').notEmpty(),
    check('data.lessons', 'Lesson is required').isArray({ min: 1 }),
];

const quizUpdateRequest = () => [
    check('user_id', 'User is invalid').not().isEmpty(),
    check('_id', 'Quiz is invalid').not().isEmpty(),
    // check('name', 'Quiz names is required').notEmpty(),
    // check('lessons', 'Lesson is required').isArray({min:1}),
];

const quizzesGetRequest = () => [
    //
];

const quizGetRequest = () => [check('_id', 'Quiz not valid').not().isEmpty()];

const quizDeleteRequest = () => [check('_id', 'Quiz not valid').not().isEmpty()];

module.exports = {
    quizCreateRequest,
    quizzesGetRequest,
    quizUpdateRequest,
    quizDeleteRequest,
    quizGetRequest,
};
