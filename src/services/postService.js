const { BlogPost, User, Category } = require('../database/models');

/*
  Consultei o seguinte link para elaborar a função getAll:
  https://stackoverflow.com/questions/57356008/counting-join-with-sequelize-with-multiple-includes
*/
const getAll = async () => {
  const blogPosts = await BlogPost.findAll(
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    },
  );
  return blogPosts;
};

const create = async (title, content, categoryIds) => {
  const post = await User.create({ title, content, categoryIds });
  return post;
};

module.exports = {
  getAll,
  create,
};
