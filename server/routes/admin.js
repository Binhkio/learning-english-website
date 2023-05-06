const express = require('express');
const Router = express.Router();
const validationMiddleware = require('../middlewares/validate');
// const auth = require('../middlewares/authenticate')
const adminController = require('../controllers/admin');
const userValidation = require('../validations/user');
const auth = require('../middlewares/authenticate');

Router.get('/get-list-user', auth.adminAuth, adminController.getListUser);
Router.delete('/delete-user', auth.adminAuth, adminController.deleteUser);
Router.put('/edit', auth.adminAuth, validationMiddleware(userValidation.userEditRequest()), adminController.editStatusUser);

module.exports = Router;
