const tokenHelper = require('../helpers/token');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  /* Como o swagger envia a 'authorization' no formato 'Bearer <token>', a linha abaixo
  faz um split para separar em um array a palavra 'Bearer e o token */
  const token = authorization.split(' ');
  try {
    /* Como a const token pode ser um array com uma ou duas posições, a linha abaixo
    garante que sempre será passado o token (último elemento do array) para a função
    de verificação */
    const tokenData = tokenHelper.verifyToken(token[token.length - 1]);
    console.log('tokenData', tokenData);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenValidation,
};
