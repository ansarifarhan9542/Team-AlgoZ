const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const authRepository = require('./auth.repository');
const employeeService = require('../employee/employee.service');
const ApiError = require('../../utils/ApiError');
const { generateToken } = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');
const { CLIENT_URL } = require('../../config/env');

const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');

/**
 * Registers a new user, creates a matching (empty) employee profile,
 * and emails a verification link.
 */
const registerUser = async ({ employeeId, email, password, role }) => {
  const existingEmail = await authRepository.findByEmail(email);
  if (existingEmail) throw new ApiError(409, 'Email is already registered');

  const existingEmployeeId = await authRepository.findByEmployeeId(employeeId);
  if (existingEmployeeId) throw new ApiError(409, 'Employee ID is already in use');

  const hashedPassword = await bcrypt.hash(password, 12);

  const rawToken = crypto.randomBytes(32).toString('hex');
  const verificationToken = hash(rawToken);
  const verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // 24h

  const user = await authRepository.create({
    employeeId,
    email,
    password: hashedPassword,
    role: role || 'employee',
    verificationToken,
    verificationTokenExpire,
  });

  // Create a blank employee profile linked to this user
  await employeeService.createBlankProfile(user._id);

  const verifyUrl = `${CLIENT_URL}/verify-email/${rawToken}`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'Verify your HRMS account',
      html: `<p>Welcome to HRMS. Please verify your email by clicking the link below:</p>
             <p><a href="${verifyUrl}">${verifyUrl}</a></p>
             <p>This link expires in 24 hours.</p>`,
    });
  } catch (err) {
    // Do not fail registration if email sending fails; log for ops follow-up
    console.error('Failed to send verification email:', err.message);
  }

  return {
    id: user._id,
    employeeId: user.employeeId,
    email: user.email,
    role: user.role,
  };
};

const verifyEmail = async (rawToken) => {
  const hashedToken = hash(rawToken);
  const user = await authRepository.findByVerificationToken(hashedToken);
  if (!user) throw new ApiError(400, 'Verification link is invalid or has expired');

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await authRepository.save(user);

  return { message: 'Email verified successfully' };
};

const loginUser = async ({ email, password }) => {
  const user = await authRepository.findByEmail(email, true);
  if (!user) throw new ApiError(401, 'Invalid email or password');

  if (!user.isActive) throw new ApiError(403, 'This account has been deactivated');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');

  if (!user.isVerified) {
    throw new ApiError(403, 'Please verify your email before logging in');
  }

  const token = generateToken({ id: user._id, role: user.role });

  return {
    token,
    user: {
      id: user._id,
      employeeId: user.employeeId,
      email: user.email,
      role: user.role,
    },
  };
};

const forgotPassword = async (email) => {
  const user = await authRepository.findByEmail(email);
  // Respond the same way whether or not the email exists (avoid user enumeration)
  if (!user) return;

  const rawToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = hash(rawToken);
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1h
  await authRepository.save(user);

  const resetUrl = `${CLIENT_URL}/reset-password/${rawToken}`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'HRMS password reset',
      html: `<p>You requested a password reset. Click below to set a new password:</p>
             <p><a href="${resetUrl}">${resetUrl}</a></p>
             <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await authRepository.save(user);
    throw new ApiError(500, 'Could not send password reset email');
  }
};

const resetPassword = async (rawToken, newPassword) => {
  const hashedToken = hash(rawToken);
  const user = await authRepository.findByResetToken(hashedToken);
  if (!user) throw new ApiError(400, 'Reset link is invalid or has expired');

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await authRepository.save(user);
};

const getMe = async (userId) => {
  const user = await authRepository.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
};
