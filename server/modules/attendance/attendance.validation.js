const Joi = require('joi');

const dateRangeQuerySchema = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date(),
});

const markAttendanceSchema = Joi.object({
  employeeId: Joi.string().required(),
  date: Joi.date().required(),
  status: Joi.string().valid('Present', 'Absent', 'Half-day', 'Leave').required(),
  checkIn: Joi.date(),
  checkOut: Joi.date(),
});

module.exports = { dateRangeQuerySchema, markAttendanceSchema };
