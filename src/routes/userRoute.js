const express = require('express');
const userController = require('../controllers/userController');
const { userValidation } = require('../middlewares/createUserValidation');
// const createUserValidation = require('../middlewares/createUserValidation');

const userRoute = express.Router();

// userRoute.post('/', createUserValidation, userController.create);
userRoute.post('/', userValidation, userController.create);

module.exports = userRoute;