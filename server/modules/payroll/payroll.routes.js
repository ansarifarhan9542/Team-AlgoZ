const express = require('express');
const router = express.Router();

const controller = require('./payroll.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/roleMiddleware');
const { upsertPayrollSchema } = require('./payroll.validation');

// --- Employee (read-only) ---
router.get('/me', protect, controller.getMyPayroll);

// --- Admin ---
router.get('/', protect, authorize('admin'), controller.getAllPayroll);
router.get('/:employeeId', protect, authorize('admin'), controller.getEmployeePayroll);
router.post('/', protect, authorize('admin'), validate(upsertPayrollSchema), controller.upsertPayroll);

module.exports = router;
