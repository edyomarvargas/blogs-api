const jwt = require('jsonwebtoken');
const userServices = require('../services/loginService');

const SECRET = process.env.JWT_SECRET;
const JWT_CONFIG = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
const INVALID_FIELDS_MSG = { message: 'Invalid fields' };

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.login(email, password);

  if (!user) return res.status(400).json(INVALID_FIELDS_MSG);

  const token = jwt.sign({ email }, SECRET, JWT_CONFIG);
  
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
