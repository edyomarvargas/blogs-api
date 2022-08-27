const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const SECRET = process.env.JWT_SECRET;
const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const findUser = await userService.getUserByEmail(email);
  if (findUser) return res.status(409).json({ message: 'User already registered' });

  await userService.create(displayName, email, password, image);

  const token = jwt.sign({ displayName, email, image }, SECRET, JWT_CONFIG);
  
  return res.status(201).json({ token });
};

module.exports = {
  create,
};
