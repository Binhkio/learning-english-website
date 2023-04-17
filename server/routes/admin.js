const express = require('express')
const Router = express.Router()
const validationMiddleware = require('../middlewares/validate')
const auth = require('../middlewares/authenticate')
const adminController = require('../controllers/admin')
const { adminValidation } = require('../validations/admin')


Router.get('/get-list-user', auth.authenticateAdmin, adminController.getListUser);
Router.delete('/delete-user', auth.authenticateAdmin, validationMiddleware(adminValidation.userRequest()), adminController.deleteUser)
Router.put('/edit', auth.authenticateAdmin, validationMiddleware(adminValidation.userEditRequest()), adminController.editStatusUser)

module.exports = Router
