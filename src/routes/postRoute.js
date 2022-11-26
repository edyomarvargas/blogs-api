const express = require('express');
const postController = require('../controllers/postController');
const { tokenValidation } = require('../middlewares/authentication');
const { postValidation } = require('../middlewares/createPostValidation');

const postRoute = express.Router();

postRoute.get('/search', tokenValidation, postController.search);
postRoute.get('/', tokenValidation, postController.getAll);
postRoute.get('/:id', tokenValidation, postController.findByPk);
postRoute.post('/', tokenValidation, postValidation, postController.create);
postRoute.put('/:id', tokenValidation, postController.update);
postRoute.delete('/:id', tokenValidation, postController.remove);

module.exports = postRoute;