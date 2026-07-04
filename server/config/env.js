require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

  // Comma-separated list of allowed frontend origins, e.g.
  // "https://myapp.vercel.app,https://admin.myapp.com". Use "*" only for local dev.
  CORS_ORIGINS: (process.env.CORS_ORIGINS || process.env.CLIENT_URL || '*')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),

  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hrms',

  JWT_SECRET: process.env.JWT_SECRET || 'insecure_dev_secret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM || 'HRMS <no-reply@hrms.com>',
};

// Fail fast in production if critical secrets were left at insecure defaults
if (config.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be set in production');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be set in production');
  }
}

module.exports = config;

