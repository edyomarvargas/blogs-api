const userService = require('../services/userService');
const tokenHelper = require('../helpers/token');
const { getCorrectTokenFormat } = require('../helpers/formatToken');

const INTERNAL_ERROR_MSG = { message: 'Internal Server Error' };

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const findUser = await userService.getUserByEmail(email);
    if (findUser) return res.status(409).json({ message: 'User already registered' });
  
    await userService.create(displayName, email, password, image);
  
    const token = tokenHelper.createToken({ displayName, email, image });
    
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const findByPk = async (req, res) => {
  try {
    const { id } = req.params;
  
    const user = await userService.findByPk(id);
  
    if (!user) return res.status(404).json({ message: 'User does not exist' });
  
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const remove = async (req, res) => {
  try {
    const token = getCorrectTokenFormat(req.headers.authorization);
    const { email: userEmail } = tokenHelper.verifyToken(token);
  
    const userData = await userService.getUserByEmail(userEmail);
  
    await userService.remove(userData.dataValues.id);
  
    return res.status(204).end();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

module.exports = {
  create,
  getAll,
  findByPk,
  remove,
};
