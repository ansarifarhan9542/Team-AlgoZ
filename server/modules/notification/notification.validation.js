const Joi = require('joi');

// Used internally by other services (leave, payroll, attendance) rather
// than exposed directly to clients, but kept here for consistency/testing.
const createNotificationSchema = Joi.object({
  user: Joi.string().required(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  type: Joi.string().valid('info', 'leave', 'attendance', 'payroll', 'alert').default('info'),
});

module.exports = { createNotificationSchema };
