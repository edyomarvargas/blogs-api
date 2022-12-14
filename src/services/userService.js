const { User } = require('../database/models');

const create = async (displayName, email, password, image) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const getUserByEmail = async (email) => {
  const findUser = await User.findOne({ where: { email } });

  return findUser;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const findByPk = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const destroy = async (id) => {
  const result = await User.destroy(
    {
      where: {
        id,
      },
    },
    );

  return result;
};

module.exports = {
  create,
  getUserByEmail,
  getAll,
  findByPk,
  destroy,
};
