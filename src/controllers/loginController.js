const userServices = require('../services/loginService');
const tokenHelper = require('../helpers/token');

const INVALID_FIELDS_MSG = { message: 'Invalid fields' };

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userServices.login(email, password);

  if (!user) return res.status(400).json(INVALID_FIELDS_MSG);

  const token = tokenHelper.createToken({ email });
  
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
