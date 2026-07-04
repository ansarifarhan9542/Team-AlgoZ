const ApiError = require('../utils/ApiError');

/**
 * Generic Joi validation middleware factory.
 * Usage: router.post('/x', validate(someJoiSchema), controller.x)
 * By default validates req.body; pass { source: 'query' } or { source: 'params' } to change.
 */
const validate = (schema, { source = 'body' } = {}) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return next(new ApiError(400, 'Validation failed', errors));
    }

    req[source] = value;
    next();
  };
};

module.exports = validate;
