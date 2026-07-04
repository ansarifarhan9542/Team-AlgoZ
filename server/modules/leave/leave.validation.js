const Joi = require('joi');

const applyLeaveSchema = Joi.object({
  leaveType: Joi.string().valid('Paid', 'Sick', 'Unpaid').required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref('startDate')).required(),
  remarks: Joi.string().allow('').max(500),
});

const reviewLeaveSchema = Joi.object({
  status: Joi.string().valid('Approved', 'Rejected').required(),
  adminComment: Joi.string().allow('').max(500),
});

module.exports = { applyLeaveSchema, reviewLeaveSchema };
