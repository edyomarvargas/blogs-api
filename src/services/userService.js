const { User } = require('../database/models');

const create = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const getUserByEmail = async (email) => {
  const findUser = await User.findOne({ where: { email } });

  return findUser;
};

module.exports = {
  create,
  getUserByEmail,
};
