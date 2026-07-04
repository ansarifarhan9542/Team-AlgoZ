const Employee = require('./employee.model');

const create = (data) => Employee.create(data);

const findByUserId = (userId) => Employee.findOne({ user: userId }).populate('user', 'employeeId email role isVerified');

const findById = (id) => Employee.findById(id).populate('user', 'employeeId email role isVerified');

const findAll = (filter = {}) => Employee.find(filter).populate('user', 'employeeId email role isVerified');

const updateByUserId = (userId, update) =>
  Employee.findOneAndUpdate({ user: userId }, update, { new: true, runValidators: true });

const updateById = (id, update) =>
  Employee.findByIdAndUpdate(id, update, { new: true, runValidators: true });

const deleteByUserId = (userId) => Employee.findOneAndDelete({ user: userId });

module.exports = {
  create,
  findByUserId,
  findById,
  findAll,
  updateByUserId,
  updateById,
  deleteByUserId,
};
