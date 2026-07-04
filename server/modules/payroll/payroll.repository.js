const Payroll = require('./payroll.model');

const upsertByEmployeeMonthYear = (employeeId, month, year, update) =>
  Payroll.findOneAndUpdate(
    { employee: employeeId, month, year },
    { $set: update },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

const findByEmployee = (employeeId) => Payroll.find({ employee: employeeId }).sort({ year: -1, month: -1 });

const findAll = (filter = {}) =>
  Payroll.find(filter)
    .populate({ path: 'employee', populate: { path: 'user', select: 'employeeId email' } })
    .sort({ year: -1, month: -1 });

module.exports = { upsertByEmployeeMonthYear, findByEmployee, findAll };
