const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/response');
const leaveService = require('./leave.service');

const applyLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.applyLeave(req.user._id, req.body);
  return success(res, 201, 'Leave request submitted', leave);
});

const getMyLeaves = asyncHandler(async (req, res) => {
  const leaves = await leaveService.getMyLeaves(req.user._id);
  return success(res, 200, 'Leave requests fetched', leaves);
});

const cancelLeave = asyncHandler(async (req, res) => {
  await leaveService.cancelLeave(req.user._id, req.params.id);
  return success(res, 200, 'Leave request cancelled');
});

const getAllLeaves = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  const leaves = await leaveService.getAllLeaves(filter);
  return success(res, 200, 'Leave requests fetched', leaves);
});

const reviewLeave = asyncHandler(async (req, res) => {
  const leave = await leaveService.reviewLeave(req.user._id, req.params.id, req.body);
  return success(res, 200, `Leave request ${leave.status.toLowerCase()}`, leave);
});

module.exports = {
  applyLeave,
  getMyLeaves,
  cancelLeave,
  getAllLeaves,
  reviewLeave,
};
