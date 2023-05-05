const { check } = require('express-validator');

const loginValidate = () => [
    check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    check('email', 'Email filed is not empty').not().isEmpty(),
    check('email', 'Invalid email address').isEmail(),
];

const registerValidate = () => [
    check('email', 'Email field is not empty').notEmpty(),
    check('email', 'Invalid email address').isEmail(),
    check('name', 'Name field is not empty').notEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    check('password', 'Password field must not be empty').notEmpty(),
];

module.exports = {
    loginValidate,
    registerValidate,
};
