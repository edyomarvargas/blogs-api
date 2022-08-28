const express = require('express');
const categoryController = require('../controllers/categoryController');
const { tokenValidation } = require('../middlewares/authentication');

const categoryRoute = express.Router();

categoryRoute.post('/', tokenValidation, categoryController.create);
categoryRoute.get('/', tokenValidation, categoryController.getAll);

module.exports = categoryRoute;