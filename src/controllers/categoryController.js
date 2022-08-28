const categoryService = require('../services/categoryService');

const NAME_REQUIRED_MSG = { message: '"name" is required' };

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json(NAME_REQUIRED_MSG);

  const result = await categoryService.create(name);

  console.log('result', result.id);
  
  return res.status(201).json(result);
};

module.exports = {
  create,
};
