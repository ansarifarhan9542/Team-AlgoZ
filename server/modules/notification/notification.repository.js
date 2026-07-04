const Notification = require('./notification.model');

const create = (data) => Notification.create(data);

const findByUser = (userId) => Notification.find({ user: userId }).sort({ createdAt: -1 });

const findByIdAndUser = (id, userId) => Notification.findOne({ _id: id, user: userId });

const markAsRead = (id, userId) =>
  Notification.findOneAndUpdate({ _id: id, user: userId }, { isRead: true }, { new: true });

const markAllAsRead = (userId) => Notification.updateMany({ user: userId, isRead: false }, { isRead: true });

module.exports = { create, findByUser, findByIdAndUser, markAsRead, markAllAsRead };
