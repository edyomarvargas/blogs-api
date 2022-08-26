const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const secret = process.env.JWT_SECRET;
const INVALID_FIELDS_MSG = { message: 'Invalid fields' };

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.login(email, password);

  if (!user) return res.status(400).json(INVALID_FIELDS_MSG);

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
