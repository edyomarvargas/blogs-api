const userService = require('../services/userService');
const postService = require('../services/postService');

const validateUser = async (postId, userData) => {
  const user = await userService.getUserByEmail(userData.email);
  const { id: userId } = user.dataValues;

  const post = await postService.findByPk(postId);
  if (!post) return null;

  const authorId = post.dataValues.userId;

  let isUserValid = false;

  if (authorId === userId) {
    isUserValid = true;
  }
  return isUserValid;
};

module.exports = validateUser;