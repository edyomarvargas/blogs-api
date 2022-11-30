const tokenHelper = require('../helpers/token');
const { getCorrectTokenFormat } = require('../helpers/formatToken');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const token = getCorrectTokenFormat(authorization);

  try {
    tokenHelper.verifyToken(token);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenValidation,
};
