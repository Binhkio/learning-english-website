const { check } = require('express-validator');

const loginValidate = () => [
  check('user.password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  check('user.email', 'Email filed is not empty').not().isEmpty(),
  check('user.email', 'Invalid email address').isEmail(),
];

const registerValidate = () => [
  check('user.email', 'Email field is not empty').notEmpty(),
  check('user.email', 'Invalid email address').isEmail(),
  check('user.name', 'Name field is not empty').notEmpty(),
  check('user.password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  check('user.password', 'Password field must not be empty').notEmpty(),
]

const authValidate = {
  loginValidate: loginValidate,
  registerValidate: registerValidate,
}

module.exports = { authValidate };
