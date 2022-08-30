const postService = require('../services/postService');
const { verifyToken } = require('../helpers/token');

const MISSING_FIELDS_MSG = { message: 'Some required fields are missing' };
const CATEGORYIDS_NOT_FOUND = { message: '"categoryIds" not found' };

const getAll = async (req, res) => {
  const blogPosts = await postService.getAll();
  return res.status(200).json(blogPosts);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) return res.status(400).json(MISSING_FIELDS_MSG);

  // if (categoryIds.length === 0) return res.status(400).json(CATEGORYIDS_NOT_FOUND);

  const payload = verifyToken(req.headers.authorization);
  
  const post = await postService.create({ title, content, categoryIds, email: payload.email });

  if (!post) return res.status(400).json(CATEGORYIDS_NOT_FOUND);
  
  return res.status(201).json(post);
};

module.exports = {
  getAll,
  create,
};
