/* Como o swagger envia a 'authorization' no formato 'Bearer <token>', a função abaixo
faz um split para separar em um array a palavra 'Bearer e o token */

const getCorrectTokenFormat = (authorization) => {
  if (!authorization) return null;
  
  const token = authorization.split(' ');

  /* Se 'authorization' vier no formato 'Bearer <token>', o token estará na posição 1 do array.
  Se 'authorization' vier no formato '<token>', a variável token será um array de apenas
  1 elemento, ou seja, o próprio token */
  if (token.length === 1) return token[0];
  return token[1];
};

module.exports = {
  getCorrectTokenFormat,
};