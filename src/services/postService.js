const { BlogPost, User, Category, PostCategory } = require('../database/models');
const { getUserByEmail } = require('./userService');

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

const verifyIds = async (categoryIds) => {
  const allCategories = await Category.findAll();

  const ids = Object.keys(allCategories).map((id) => Number(id) + 1);

  /*
  Consultei o seguinte link para comparar os valores de 2 arrays:
  https://pt.stackoverflow.com/questions/265446/comparar-valores-entre-arrays-javascript
  Consultei o seguinte link para resolver o problema de lint 'Arrow function used ambiguously with a conditional expression':
  https://stackoverflow.com/questions/41349689/how-do-you-use-an-arrow-function-with-comparison-operator-for-reduce-method
  */
  const checkCategories = ids.filter((id) => (categoryIds.indexOf(id) === -1 ? null : true));

  return checkCategories;
};

const create = async ({ title, content, categoryIds, email }) => {
  const userData = await getUserByEmail(email);
  const userId = userData.dataValues.id;

  const isCategoryValid = await verifyIds(categoryIds);
  if (isCategoryValid.length === 0) return null;

  const post = await BlogPost.create({ title, content, userId });

  categoryIds.forEach(async (id) => {
    await PostCategory.create({ postId: post.id, categoryId: id });
  });

  return post;
};

const findByPk = async (id) => {
  const post = await BlogPost.findByPk(id,
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });

  return post;
};

const update = async ({ id, title, content }) => {
  const updatedPost = await BlogPost.update({ title, content },
    {
      where: {
        id,
      },
    });

  return updatedPost;
};

module.exports = {
  getAll,
  create,
  findByPk,
  update,
};
