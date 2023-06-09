const { check } = require('express-validator');

const userRequest = () => [check('_id', 'User is invalid').not().isEmpty()];

const userEditRequest = () => [check('_id', 'User is invalid').not().isEmpty(), check('data', 'Updated data is invalid').not().isEmpty()];

module.exports = {
    userRequest,
    userEditRequest,
};
