const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/response');
const attendanceService = require('./attendance.service');

const checkIn = asyncHandler(async (req, res) => {
  const record = await attendanceService.checkIn(req.user._id);
  return success(res, 200, 'Checked in successfully', record);
});

const checkOut = asyncHandler(async (req, res) => {
  const record = await attendanceService.checkOut(req.user._id);
  return success(res, 200, 'Checked out successfully', record);
});

const getMyAttendance = asyncHandler(async (req, res) => {
  const records = await attendanceService.getMyAttendance(req.user._id, req.query);
  return success(res, 200, 'Attendance fetched', records);
});

const getAllAttendance = asyncHandler(async (req, res) => {
  const records = await attendanceService.getAllAttendance(req.query);
  return success(res, 200, 'Attendance fetched', records);
});

const getEmployeeAttendance = asyncHandler(async (req, res) => {
  const records = await attendanceService.getEmployeeAttendance(req.params.employeeId, req.query);
  return success(res, 200, 'Attendance fetched', records);
});

const markAttendance = asyncHandler(async (req, res) => {
  const record = await attendanceService.markAttendance(req.body);
  return success(res, 200, 'Attendance recorded', record);
});

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  markAttendance,
};
