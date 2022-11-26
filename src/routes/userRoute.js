const express = require('express');
const userController = require('../controllers/userController');
const { userValidation } = require('../middlewares/createUserValidation');
const { tokenValidation } = require('../middlewares/authentication');

const userRoute = express.Router();

userRoute.post('/', userValidation, userController.create);
userRoute.get('/', tokenValidation, userController.getAll);
userRoute.get('/:id', tokenValidation, userController.findByPk);
userRoute.delete('/me', tokenValidation, userController.remove);

module.exports = userRoute;