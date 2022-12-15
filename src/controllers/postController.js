const postService = require('../services/postService');
const { verifyToken } = require('../helpers/token');
const validateUser = require('../helpers/validateUser');
const { getCorrectTokenFormat } = require('../helpers/formatToken');

const MISSING_FIELDS_MSG = { message: 'Some required fields are missing' };
const CATEGORYIDS_NOT_FOUND = { message: '"categoryIds" not found' };
const POST_NOT_FOUND = { message: 'Post does not exist' };
const UNAUTHORIZED_USER_MSG = { message: 'Unauthorized user' };
const INTERNAL_ERROR_MSG = { message: 'Internal Server Error' };

const getAll = async (req, res) => {
  try {
    const blogPosts = await postService.getAll();
    return res.status(200).json(blogPosts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const create = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
  
    const token = getCorrectTokenFormat(req.headers.authorization);
    const payload = verifyToken(token);
    
    const post = await postService.create({ title, content, categoryIds, email: payload.email });
  
    if (!post) return res.status(400).json(CATEGORYIDS_NOT_FOUND);
    
    return res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const findByPk = async (req, res) => {
  try {
    const { id } = req.params;
  
    const post = await postService.findByPk(id);
  
    if (!post) return res.status(404).json(POST_NOT_FOUND);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const update = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { title, content } = req.body;
  
    const token = getCorrectTokenFormat(req.headers.authorization);
    const userData = verifyToken(token);
  
    if (!title || !content) return res.status(400).json(MISSING_FIELDS_MSG);
  
    const isUserValid = await validateUser(postId, userData);
    if (!isUserValid) return res.status(401).json(UNAUTHORIZED_USER_MSG);
  
    await postService.update({ id: postId, title, content });
  
    const updatedPost = await postService.findByPk(postId);
  
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const token = getCorrectTokenFormat(req.headers.authorization);
    const userData = verifyToken(token);
  
    const findPost = await postService.findByPk(id);
    if (!findPost) return res.status(404).json(POST_NOT_FOUND);
  
    const isUserValid = await validateUser(id, userData);
    if (!isUserValid) return res.status(401).json(UNAUTHORIZED_USER_MSG);
  
    await postService.remove(id);
  
    return res.status(204).end();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const search = async (req, res) => {
  try {
    const { q: query } = req.query;

    const queryResult = await postService.search(query);
  
    return res.status(200).json(queryResult); 
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

module.exports = {
  getAll,
  create,
  findByPk,
  update,
  remove,
  search,
};
