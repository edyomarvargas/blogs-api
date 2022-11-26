const express = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRoute = express.Router();

categoryRoute.post('/', categoryController.create);
categoryRoute.get('/', categoryController.getAll);

module.exports = categoryRoute;