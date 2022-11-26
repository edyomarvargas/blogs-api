const categoryService = require('../services/categoryService');

const NAME_REQUIRED_MSG = { message: '"name" is required' };
const INTERNAL_ERROR_MSG = { message: 'Internal Server Error' };

const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json(NAME_REQUIRED_MSG);
  
    const result = await categoryService.create(name);  
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

const getAll = async (_req, res) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories); 
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(INTERNAL_ERROR_MSG);
  }
};

module.exports = {
  create,
  getAll,
};
