const { Category } = require('../database/models');

const create = async (name) => {
  const result = await Category.create({ name });
  return result;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};
