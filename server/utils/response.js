/**
 * Standard API response helpers so every module returns a consistent shape.
 */

const success = (res, statusCode = 200, message = 'Success', data = null, meta = null) => {
  const body = { success: true, message };
  if (data !== null) body.data = data;
  if (meta !== null) body.meta = meta;
  return res.status(statusCode).json(body);
};

const error = (res, statusCode = 500, message = 'Something went wrong', errors = null) => {
  const body = { success: false, message };
  if (errors !== null) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { success, error };
