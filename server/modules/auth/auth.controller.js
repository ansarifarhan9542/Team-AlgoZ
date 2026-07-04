const asyncHandler = require('../../utils/asyncHandler');
const { success } = require('../../utils/response');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  return success(res, 201, 'Registration successful. Please check your email to verify your account.', result);
});

const verifyEmail = asyncHandler(async (req, res) => {
  const result = await authService.verifyEmail(req.params.token);
  return success(res, 200, result.message);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  return success(res, 200, 'Login successful', result);
});

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  return success(res, 200, 'If that email is registered, a reset link has been sent.');
});

const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  return success(res, 200, 'Password has been reset successfully. You can now log in.');
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);
  return success(res, 200, 'Current user fetched', user);
});

const logout = asyncHandler(async (req, res) => {
  // Stateless JWT: logout is handled client-side by discarding the token.
  return success(res, 200, 'Logged out successfully');
});

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  logout,
};
