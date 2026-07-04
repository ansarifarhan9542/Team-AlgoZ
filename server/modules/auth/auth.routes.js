const express = require('express');
const router = express.Router();

const controller = require('./auth.controller');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/authMiddleware');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('./auth.validation');

router.post('/register', validate(registerSchema), controller.register);
router.get('/verify-email/:token', controller.verifyEmail);
router.post('/login', validate(loginSchema), controller.login);
router.post('/forgot-password', validate(forgotPasswordSchema), controller.forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), controller.resetPassword);
router.get('/me', protect, controller.getMe);
router.post('/logout', protect, controller.logout);

module.exports = router;
