const payrollRepository = require('./payroll.repository');
const employeeRepository = require('../employee/employee.repository');
const notificationService = require('../notification/notification.service');
const ApiError = require('../../utils/ApiError');

const getMyPayroll = async (userId) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');
  return payrollRepository.findByEmployee(profile._id);
};

const getEmployeePayroll = (employeeId) => payrollRepository.findByEmployee(employeeId);

const getAllPayroll = (filter = {}) => payrollRepository.findAll(filter);

// Admin creates or updates a payroll record for a given employee + period.
// netSalary is always computed server-side to avoid inconsistent client input.
const upsertPayroll = async (adminUserId, { employeeId, month, year, basicSalary, hra, allowances, deductions, status }) => {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) throw new ApiError(404, 'Employee not found');

  const netSalary = Number(basicSalary) + Number(hra || 0) + Number(allowances || 0) - Number(deductions || 0);
  if (netSalary < 0) throw new ApiError(400, 'Net salary cannot be negative — check deductions');

  const payroll = await payrollRepository.upsertByEmployeeMonthYear(employeeId, month, year, {
    basicSalary,
    hra,
    allowances,
    deductions,
    netSalary,
    status,
    updatedBy: adminUserId,
  });

  if (employee.user?._id) {
    await notificationService.createNotification({
      user: employee.user._id,
      title: 'Payroll updated',
      message: `Your payroll for ${month}/${year} has been updated. Net salary: ${netSalary}.`,
      type: 'payroll',
    });
  }

  return payroll;
};

module.exports = {
  getMyPayroll,
  getEmployeePayroll,
  getAllPayroll,
  upsertPayroll,
};
