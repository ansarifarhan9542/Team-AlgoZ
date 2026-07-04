const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/response');
const employeeService = require('./employee.service');

const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await employeeService.getMyProfile(req.user._id);
  return success(res, 200, 'Profile fetched', profile);
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const profile = await employeeService.updateMyProfile(req.user._id, req.body);
  return success(res, 200, 'Profile updated', profile);
});

const uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const fileUrl = `/uploads/profile-pictures/${req.file.filename}`;
  const profile = await employeeService.setProfilePicture(req.user._id, fileUrl);
  return success(res, 200, 'Profile picture updated', profile);
});

const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  const doc = { name: req.body.name || req.file.originalname, url: `/uploads/documents/${req.file.filename}` };
  const profile = await employeeService.addDocument(req.user._id, doc);
  return success(res, 200, 'Document uploaded', profile);
});

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllEmployees(req.query);
  return success(res, 200, 'Employees fetched', employees);
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  return success(res, 200, 'Employee fetched', employee);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.updateEmployeeByAdmin(req.params.id, req.body);
  return success(res, 200, 'Employee updated', employee);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.userId);
  return success(res, 200, 'Employee deleted');
});

module.exports = {
  getMyProfile,
  updateMyProfile,
  uploadProfilePicture,
  uploadDocument,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
