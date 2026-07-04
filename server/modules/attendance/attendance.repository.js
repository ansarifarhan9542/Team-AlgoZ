const Attendance = require('./attendance.model');

const startOfDay = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
};

const create = (data) => Attendance.create(data);

const findByEmployeeAndDate = (employeeId, date) =>
  Attendance.findOne({ employee: employeeId, date: startOfDay(date) });

const findByEmployeeInRange = (employeeId, startDate, endDate) => {
  const filter = { employee: employeeId };
  if (startDate || endDate) filter.date = {};
  if (startDate) filter.date.$gte = startOfDay(startDate);
  if (endDate) filter.date.$lte = startOfDay(endDate);
  return Attendance.find(filter).sort({ date: -1 });
};

const findAllInRange = (startDate, endDate) => {
  const filter = {};
  if (startDate || endDate) filter.date = {};
  if (startDate) filter.date.$gte = startOfDay(startDate);
  if (endDate) filter.date.$lte = startOfDay(endDate);
  return Attendance.find(filter).populate({
    path: 'employee',
    populate: { path: 'user', select: 'employeeId email' },
  }).sort({ date: -1 });
};

const updateById = (id, update) => Attendance.findByIdAndUpdate(id, update, { new: true, runValidators: true });

const upsertByEmployeeAndDate = (employeeId, date, update) =>
  Attendance.findOneAndUpdate(
    { employee: employeeId, date: startOfDay(date) },
    { $set: update },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

module.exports = {
  create,
  findByEmployeeAndDate,
  findByEmployeeInRange,
  findAllInRange,
  updateById,
  upsertByEmployeeAndDate,
  startOfDay,
};
