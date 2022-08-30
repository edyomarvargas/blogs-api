const express = require('express');
const postController = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/authentication');

const postRoute = express.Router();

postRoute.get('/', tokenValidation, postController.getAll);
postRoute.get('/:id', tokenValidation, postController.findByPk);
postRoute.post('/', tokenValidation, postController.create);
postRoute.put('/:id', tokenValidation, postController.update);
postRoute.delete('/:id', tokenValidation, postController.remove);

module.exports = postRoute;