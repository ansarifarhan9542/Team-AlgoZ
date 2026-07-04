/**
 * Wraps async route handlers so thrown/rejected errors are forwarded to
 * the centralized error middleware instead of crashing the process.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
