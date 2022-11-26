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

const findByPk = async (req, res) => {
  const { id } = req.params;

  const user = await userService.findByPk(id);

  if (!user) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(user);
};

const remove = async (req, res) => {
  const { email: userEmail } = tokenHelper.verifyToken(req.headers.authorization);

  const userData = await userService.getUserByEmail(userEmail);

  await userService.remove(userData.dataValues.id);

  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  findByPk,
  remove,
};
