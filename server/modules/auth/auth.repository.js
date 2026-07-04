const User = require('./auth.model');

const create = (data) => User.create(data);

const findByEmail = (email, withPassword = false) => {
  const query = User.findOne({ email });
  return withPassword ? query.select('+password') : query;
};

const findByEmployeeId = (employeeId) => User.findOne({ employeeId });

const findById = (id) => User.findById(id);

const findByVerificationToken = (token) =>
  User.findOne({
    verificationToken: token,
    verificationTokenExpire: { $gt: Date.now() },
  }).select('+verificationToken +verificationTokenExpire');

const findByResetToken = (token) =>
  User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+resetPasswordToken +resetPasswordExpire +password');

const save = (userDoc) => userDoc.save();

module.exports = {
  create,
  findByEmail,
  findByEmployeeId,
  findById,
  findByVerificationToken,
  findByResetToken,
  save,
};
