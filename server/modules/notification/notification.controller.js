const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/response');
const notificationService = require('./notification.service');

const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await notificationService.getMyNotifications(req.user._id);
  return success(res, 200, 'Notifications fetched', notifications);
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.user._id, req.params.id);
  return success(res, 200, 'Notification marked as read', notification);
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user._id);
  return success(res, 200, 'All notifications marked as read');
});

module.exports = { getMyNotifications, markAsRead, markAllAsRead };
