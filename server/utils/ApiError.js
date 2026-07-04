/**
 * Custom error class carrying an HTTP status code, used throughout the
 * service layer so the error middleware can respond appropriately.
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
