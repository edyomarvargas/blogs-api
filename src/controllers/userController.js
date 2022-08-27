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

module.exports = {
  create,
};
