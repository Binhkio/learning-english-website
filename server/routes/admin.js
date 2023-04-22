const express = require('express')
const Router = express.Router()
const validationMiddleware = require('../middlewares/validate')
const auth = require('../middlewares/authenticate')
const adminController = require('../controllers/admin')
const { userValidation } = require('../validations/user')


Router.get('/get-list-user', auth.authenticateAdmin, adminController.getListUser);
Router.delete('/delete-user', auth.authenticateAdmin, adminController.deleteUser)
Router.put('/edit', auth.authenticateAdmin, validationMiddleware(userValidation.userEditRequest()), adminController.editStatusUser)

module.exports = Router
