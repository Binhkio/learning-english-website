const { check } = require('express-validator');

const userRequest = () => [
  check('_id', 'User is invalid').not().isEmpty(),
];

const userEditRequest = () => [
  check('_id', 'User is invalid').not().isEmpty(),
  check('data', 'Updated data is invalid').not().isEmpty(),
]

const userValidation = {
  userRequest: userRequest,
  userEditRequest: userEditRequest
}

module.exports = { userValidation };