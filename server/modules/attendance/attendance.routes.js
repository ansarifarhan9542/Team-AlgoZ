const express = require('express');
const router = express.Router();

const controller = require('./attendance.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/roleMiddleware');
const { dateRangeQuerySchema, markAttendanceSchema } = require('./attendance.validation');

// --- Employee ---
router.post('/check-in', protect, controller.checkIn);
router.post('/check-out', protect, controller.checkOut);
router.get('/me', protect, validate(dateRangeQuerySchema, { source: 'query' }), controller.getMyAttendance);

// --- Admin ---
router.get('/', protect, authorize('admin'), validate(dateRangeQuerySchema, { source: 'query' }), controller.getAllAttendance);
router.get('/:employeeId', protect, authorize('admin'), validate(dateRangeQuerySchema, { source: 'query' }), controller.getEmployeeAttendance);
router.post('/mark', protect, authorize('admin'), validate(markAttendanceSchema), controller.markAttendance);

module.exports = router;
