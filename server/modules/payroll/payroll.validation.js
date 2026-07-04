const Joi = require('joi');

const upsertPayrollSchema = Joi.object({
  employeeId: Joi.string().required(),
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(2000).required(),
  basicSalary: Joi.number().min(0).required(),
  hra: Joi.number().min(0).default(0),
  allowances: Joi.number().min(0).default(0),
  deductions: Joi.number().min(0).default(0),
  status: Joi.string().valid('Draft', 'Finalized', 'Paid').default('Draft'),
});

module.exports = { upsertPayrollSchema };
