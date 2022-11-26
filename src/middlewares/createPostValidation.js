const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const postValidation = (req, res, next) => {
  const { error } = postSchema.validate(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });
  next();
};

module.exports = {
  postValidation,
};
