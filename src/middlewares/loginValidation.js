const MISSING_FIELDS_MSG = { message: 'Some required fields are missing' };

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json(MISSING_FIELDS_MSG);

  next();  
};

module.exports = loginValidation;