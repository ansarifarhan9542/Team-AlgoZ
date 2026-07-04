const express = require('express');
const router = express.Router();

const controller = require('./leave.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/roleMiddleware');
const { applyLeaveSchema, reviewLeaveSchema } = require('./leave.validation');

// --- Employee ---
router.post('/', protect, validate(applyLeaveSchema), controller.applyLeave);
router.get('/me', protect, controller.getMyLeaves);
router.delete('/:id', protect, controller.cancelLeave);

// --- Admin ---
router.get('/', protect, authorize('admin'), controller.getAllLeaves);
router.put('/:id/review', protect, authorize('admin'), validate(reviewLeaveSchema), controller.reviewLeave);

module.exports = router;
