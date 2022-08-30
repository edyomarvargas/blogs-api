const userService = require('../services/userService');

const validateUser = async (postId, userData) => {
  const user = await userService.getUserByEmail(userData.email);
  const { id: userId } = user.dataValues;
  let isUserValid = false;

  if (Number(postId) === userId) {
    isUserValid = true;
  }
  return isUserValid;
};

module.exports = validateUser;