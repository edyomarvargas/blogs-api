const { BlogPost, User } = require('../database/models');

const getAll = async () => {
  const blogPosts = await BlogPost.findAll({ include: { model: User, as: 'user' } });
  return blogPosts;
};

module.exports = {
  getAll,
};
