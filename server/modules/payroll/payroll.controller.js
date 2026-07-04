const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/response');
const payrollService = require('./payroll.service');

const getMyPayroll = asyncHandler(async (req, res) => {
  const payroll = await payrollService.getMyPayroll(req.user._id);
  return success(res, 200, 'Payroll fetched', payroll);
});

const getAllPayroll = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.month) filter.month = Number(req.query.month);
  if (req.query.year) filter.year = Number(req.query.year);
  const payroll = await payrollService.getAllPayroll(filter);
  return success(res, 200, 'Payroll fetched', payroll);
});

const getEmployeePayroll = asyncHandler(async (req, res) => {
  const payroll = await payrollService.getEmployeePayroll(req.params.employeeId);
  return success(res, 200, 'Payroll fetched', payroll);
});

const upsertPayroll = asyncHandler(async (req, res) => {
  const payroll = await payrollService.upsertPayroll(req.user._id, req.body);
  return success(res, 200, 'Payroll saved', payroll);
});

module.exports = {
  getMyPayroll,
  getAllPayroll,
  getEmployeePayroll,
  upsertPayroll,
};
