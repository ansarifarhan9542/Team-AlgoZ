const express = require('express');
const router = express.Router();

const controller = require('./notification.controller');
const { protect } = require('../../middleware/authMiddleware');

router.get('/me', protect, controller.getMyNotifications);
router.put('/:id/read', protect, controller.markAsRead);
router.put('/read-all', protect, controller.markAllAsRead);

module.exports = router;
