const attendanceRepository = require('./attendance.repository');
const employeeRepository = require('../employee/employee.repository');
const ApiError = require('../../utils/ApiError');

const getEmployeeProfileOrThrow = async (userId) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');
  return profile;
};

const checkIn = async (userId) => {
  const profile = await getEmployeeProfileOrThrow(userId);
  const today = new Date();

  const existing = await attendanceRepository.findByEmployeeAndDate(profile._id, today);
  if (existing && existing.checkIn) {
    throw new ApiError(409, 'You have already checked in today');
  }

  return attendanceRepository.upsertByEmployeeAndDate(profile._id, today, {
    checkIn: new Date(),
    status: 'Present',
  });
};

const checkOut = async (userId) => {
  const profile = await getEmployeeProfileOrThrow(userId);
  const today = new Date();

  const existing = await attendanceRepository.findByEmployeeAndDate(profile._id, today);
  if (!existing || !existing.checkIn) {
    throw new ApiError(400, 'You must check in before checking out');
  }
  if (existing.checkOut) {
    throw new ApiError(409, 'You have already checked out today');
  }

  existing.checkOut = new Date();

  // Simple heuristic: less than 5 hours worked -> Half-day
  const hoursWorked = (existing.checkOut - existing.checkIn) / (1000 * 60 * 60);
  existing.status = hoursWorked < 5 ? 'Half-day' : 'Present';

  await existing.save();
  return existing;
};

const getMyAttendance = async (userId, { startDate, endDate }) => {
  const profile = await getEmployeeProfileOrThrow(userId);
  return attendanceRepository.findByEmployeeInRange(profile._id, startDate, endDate);
};

const getEmployeeAttendance = async (employeeId, { startDate, endDate }) => {
  return attendanceRepository.findByEmployeeInRange(employeeId, startDate, endDate);
};

const getAllAttendance = async ({ startDate, endDate }) => {
  return attendanceRepository.findAllInRange(startDate, endDate);
};

// Admin manual override / backfill (e.g. marking someone on Leave, correcting a record)
const markAttendance = async ({ employeeId, date, status, checkIn: ci, checkOut: co }) => {
  const update = { status };
  if (ci) update.checkIn = ci;
  if (co) update.checkOut = co;
  return attendanceRepository.upsertByEmployeeAndDate(employeeId, date, update);
};

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getEmployeeAttendance,
  getAllAttendance,
  markAttendance,
};
