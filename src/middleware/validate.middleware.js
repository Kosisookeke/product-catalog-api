const Joi = require('joi');
const { sendError } = require('../utils/response.util');

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], { abortEarly: false });
    if (error) {
      const messages = error.details.map(detail => detail.message).join(', ');
      return sendError(res, 400, `Validation error: ${messages}`);
    }
    next();
  };
};

module.exports = validate;