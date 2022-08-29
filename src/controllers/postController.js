const postService = require('../services/postService');

const getAll = async (req, res) => {
  const blogPosts = await postService.getAll();
  return res.status(200).json(blogPosts);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const post = await postService.create(title, content, categoryIds);
  
  return res.status(201).json(post);
};

module.exports = {
  getAll,
  create,
};
