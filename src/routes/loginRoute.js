const express = require('express');
const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginValidation');

const loginRoute = express.Router();

loginRoute.post('/', loginValidation, loginController.login);

module.exports = loginRoute;