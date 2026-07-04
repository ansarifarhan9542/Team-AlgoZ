const leaveRepository = require('./leave.repository');
const employeeRepository = require('../employee/employee.repository');
const attendanceRepository = require('../attendance/attendance.repository');
const notificationService = require('../notification/notification.service');
const ApiError = require('../../utils/ApiError');

const applyLeave = async (userId, { leaveType, startDate, endDate, remarks }) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');

  const overlap = await leaveRepository.findOverlapping(profile._id, startDate, endDate);
  if (overlap) throw new ApiError(409, 'You already have a leave request overlapping these dates');

  const leave = await leaveRepository.create({
    employee: profile._id,
    leaveType,
    startDate,
    endDate,
    remarks,
  });

  return leave;
};

const getMyLeaves = async (userId) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');
  return leaveRepository.findByEmployee(profile._id);
};

const cancelLeave = async (userId, leaveId) => {
  const profile = await employeeRepository.findByUserId(userId);
  const leave = await leaveRepository.findById(leaveId);

  if (!leave) throw new ApiError(404, 'Leave request not found');
  if (String(leave.employee) !== String(profile._id)) {
    throw new ApiError(403, 'You cannot cancel another employee\u2019s leave request');
  }
  if (leave.status !== 'Pending') {
    throw new ApiError(400, 'Only pending leave requests can be cancelled');
  }

  await leaveRepository.deleteById(leaveId);
};

const getAllLeaves = (filter = {}) => leaveRepository.findAll(filter);

// Marks each day of an approved leave as "Leave" in the attendance records
const markAttendanceForLeave = async (employeeId, startDate, endDate) => {
  const current = new Date(startDate);
  const end = new Date(endDate);
  while (current <= end) {
    await attendanceRepository.upsertByEmployeeAndDate(employeeId, new Date(current), { status: 'Leave' });
    current.setDate(current.getDate() + 1);
  }
};

const reviewLeave = async (adminUserId, leaveId, { status, adminComment }) => {
  const leave = await leaveRepository.findById(leaveId);
  if (!leave) throw new ApiError(404, 'Leave request not found');
  if (leave.status !== 'Pending') throw new ApiError(400, 'This leave request has already been reviewed');

  leave.status = status;
  leave.adminComment = adminComment || '';
  leave.reviewedBy = adminUserId;
  leave.reviewedAt = new Date();
  await leave.save();

  if (status === 'Approved') {
    await markAttendanceForLeave(leave.employee, leave.startDate, leave.endDate);
  }

  const employee = await employeeRepository.findById(leave.employee);
  if (employee?.user?._id) {
    await notificationService.createNotification({
      user: employee.user._id,
      title: `Leave request ${status.toLowerCase()}`,
      message: `Your ${leave.leaveType} leave request has been ${status.toLowerCase()}.${
        adminComment ? ` Comment: ${adminComment}` : ''
      }`,
      type: 'leave',
    });
  }

  return leave;
};

module.exports = {
  applyLeave,
  getMyLeaves,
  cancelLeave,
  getAllLeaves,
  reviewLeave,
};
