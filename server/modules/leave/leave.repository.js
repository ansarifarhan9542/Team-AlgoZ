const Leave = require('./leave.model');

const create = (data) => Leave.create(data);

const findById = (id) => Leave.findById(id);

const findByEmployee = (employeeId) => Leave.find({ employee: employeeId }).sort({ createdAt: -1 });

const findAll = (filter = {}) =>
  Leave.find(filter)
    .populate({ path: 'employee', populate: { path: 'user', select: 'employeeId email' } })
    .sort({ createdAt: -1 });

const findOverlapping = (employeeId, startDate, endDate) =>
  Leave.findOne({
    employee: employeeId,
    status: { $in: ['Pending', 'Approved'] },
    startDate: { $lte: endDate },
    endDate: { $gte: startDate },
  });

const updateById = (id, update) => Leave.findByIdAndUpdate(id, update, { new: true, runValidators: true });

const deleteById = (id) => Leave.findByIdAndDelete(id);

module.exports = {
  create,
  findById,
  findByEmployee,
  findAll,
  findOverlapping,
  updateById,
  deleteById,
};
