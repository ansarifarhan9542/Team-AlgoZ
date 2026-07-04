const employeeRepository = require('./employee.repository');
const ApiError = require('../../utils/ApiError');

/**
 * Called by auth.service on registration to create an empty profile
 * that the employee/admin can fill in later.
 */
const createBlankProfile = (userId) => employeeRepository.create({ user: userId });

const getMyProfile = async (userId) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');
  return profile;
};

// Employees may only edit a limited set of fields (phone, address); profile
// picture/documents are handled by dedicated upload endpoints.
const updateMyProfile = async (userId, updates) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');

  profile.personalDetails.phone = updates.phone ?? profile.personalDetails.phone;
  profile.personalDetails.address = updates.address ?? profile.personalDetails.address;
  await profile.save();
  return profile;
};

const setProfilePicture = async (userId, fileUrl) => {
  const profile = await employeeRepository.updateByUserId(userId, { profilePicture: fileUrl });
  if (!profile) throw new ApiError(404, 'Employee profile not found');
  return profile;
};

const addDocument = async (userId, doc) => {
  const profile = await employeeRepository.findByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee profile not found');
  profile.documents.push(doc);
  await profile.save();
  return profile;
};

const getAllEmployees = (query = {}) => {
  const filter = {};
  if (query.department) filter['jobDetails.department'] = query.department;
  return employeeRepository.findAll(filter);
};

const getEmployeeById = async (id) => {
  const profile = await employeeRepository.findById(id);
  if (!profile) throw new ApiError(404, 'Employee not found');
  return profile;
};

// Admin can edit any field, including job details and salary structure
const updateEmployeeByAdmin = async (id, updates) => {
  const profile = await employeeRepository.updateById(id, updates);
  if (!profile) throw new ApiError(404, 'Employee not found');
  return profile;
};

const deleteEmployee = async (userId) => {
  const profile = await employeeRepository.deleteByUserId(userId);
  if (!profile) throw new ApiError(404, 'Employee not found');
  return profile;
};

module.exports = {
  createBlankProfile,
  getMyProfile,
  updateMyProfile,
  setProfilePicture,
  addDocument,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeByAdmin,
  deleteEmployee,
};
