const userService = require('../services/userService');
const tokenHelper = require('../helpers/token');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const findUser = await userService.getUserByEmail(email);
  if (findUser) return res.status(409).json({ message: 'User already registered' });

  await userService.create(displayName, email, password, image);

  const token = tokenHelper.createToken({ displayName, email, image });
  
  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

module.exports = {
  create,
  getAll,
};
