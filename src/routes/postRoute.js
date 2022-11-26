const express = require('express');
const postController = require('../controllers/postController');
const { postValidation } = require('../middlewares/createPostValidation');

const postRoute = express.Router();

postRoute.get('/search', postController.search);
postRoute.get('/', postController.getAll);
postRoute.get('/:id', postController.findByPk);
postRoute.post('/', postValidation, postController.create);
postRoute.put('/:id', postController.update);
postRoute.delete('/:id', postController.remove);

module.exports = postRoute;