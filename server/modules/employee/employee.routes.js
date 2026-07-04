const express = require('express');
const router = express.Router();

const controller = require('./employee.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/roleMiddleware');
const { makeUploader } = require('../../middleware/uploadMiddleware');
const { updateMyProfileSchema, updateEmployeeAdminSchema } = require('./employee.validation');

const uploadPicture = makeUploader('profile-pictures', /jpeg|jpg|png/);
const uploadDoc = makeUploader('documents', /pdf|doc|docx|jpeg|jpg|png/);

// --- Self-service (employee) ---
router.get('/me', protect, controller.getMyProfile);
router.put('/me', protect, validate(updateMyProfileSchema), controller.updateMyProfile);
router.post('/me/profile-picture', protect, uploadPicture.single('profilePicture'), controller.uploadProfilePicture);
router.post('/me/documents', protect, uploadDoc.single('document'), controller.uploadDocument);

// --- Admin ---
router.get('/', protect, authorize('admin'), controller.getAllEmployees);
router.get('/:id', protect, authorize('admin'), controller.getEmployeeById);
router.put('/:id', protect, authorize('admin'), validate(updateEmployeeAdminSchema), controller.updateEmployee);
router.delete('/:userId', protect, authorize('admin'), controller.deleteEmployee);

module.exports = router;
