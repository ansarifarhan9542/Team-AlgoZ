const notificationRepository = require('./notification.repository');
const ApiError = require('../../utils/ApiError');

// Called internally by other modules (leave, payroll, attendance) to push
// an in-app notification to a user.
const createNotification = (data) => notificationRepository.create(data);

const getMyNotifications = (userId) => notificationRepository.findByUser(userId);

const markAsRead = async (userId, notificationId) => {
  const notification = await notificationRepository.markAsRead(notificationId, userId);
  if (!notification) throw new ApiError(404, 'Notification not found');
  return notification;
};

const markAllAsRead = (userId) => notificationRepository.markAllAsRead(userId);

module.exports = {
  createNotification,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
};
