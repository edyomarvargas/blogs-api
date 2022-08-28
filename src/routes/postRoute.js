const express = require('express');
const postController = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/authentication');

const postRoute = express.Router();

postRoute.get('/', tokenValidation, postController.getAll);

module.exports = postRoute;