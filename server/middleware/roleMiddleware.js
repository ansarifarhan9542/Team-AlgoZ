const ApiError = require('../utils/ApiError');

/**
 * Restricts a route to the given roles. Usage: authorize('admin')
 * Must be used after `protect` so req.user is available.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized'));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `Role '${req.user.role}' is not permitted to access this resource`));
    }
    next();
  };
};

module.exports = { authorize };
