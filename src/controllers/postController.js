const postService = require('../services/postService');
const { verifyToken } = require('../helpers/token');
const validateUser = require('../helpers/validateUser');

const MISSING_FIELDS_MSG = { message: 'Some required fields are missing' };
const CATEGORYIDS_NOT_FOUND = { message: '"categoryIds" not found' };
const POST_NOT_FOUND = { message: 'Post does not exist' };
const UNAUTHORIZED_USER_MSG = { message: 'Unauthorized user' };

const getAll = async (req, res) => {
  const blogPosts = await postService.getAll();
  return res.status(200).json(blogPosts);
};

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) return res.status(400).json(MISSING_FIELDS_MSG);

  const payload = verifyToken(req.headers.authorization);
  
  const post = await postService.create({ title, content, categoryIds, email: payload.email });

  if (!post) return res.status(400).json(CATEGORYIDS_NOT_FOUND);
  
  return res.status(201).json(post);
};

const findByPk = async (req, res) => {
  const { id } = req.params;

  const post = await postService.findByPk(id);

  if (!post) return res.status(404).json(POST_NOT_FOUND);
  return res.status(200).json(post);
};

const update = async (req, res) => {
  const { id: postId } = req.params;
  const { title, content } = req.body;

  const userData = verifyToken(req.headers.authorization);

  if (!title || !content) return res.status(400).json(MISSING_FIELDS_MSG);

  const isUserValid = await validateUser(postId, userData);

  if (!isUserValid) return res.status(401).json(UNAUTHORIZED_USER_MSG);

  await postService.update({ id: postId, title, content });

  const updatedPost = await postService.findByPk(postId);

  return res.status(200).json(updatedPost);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const userData = verifyToken(req.headers.authorization);

  const findPost = await postService.findByPk(id);
  if (!findPost) return res.status(404).json(POST_NOT_FOUND);

  const isUserValid = await validateUser(id, userData);
  if (!isUserValid) return res.status(401).json(UNAUTHORIZED_USER_MSG);

  await postService.remove(id);

  return res.status(204).end();
};

const search = async (req, res) => {
  const { q: query } = req.query;

  const queryResult = await postService.search(query);

  return res.status(200).json(queryResult);
};

module.exports = {
  getAll,
  create,
  findByPk,
  update,
  remove,
  search,
};
