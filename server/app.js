const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { NODE_ENV, CORS_ORIGINS } = require('./config/env');

const authRoutes = require('./modules/auth/auth.routes');
const employeeRoutes = require('./modules/employee/employee.routes');
const attendanceRoutes = require('./modules/attendance/attendance.routes');
const leaveRoutes = require('./modules/leave/leave.routes');
const payrollRoutes = require('./modules/payroll/payroll.routes');
const notificationRoutes = require('./modules/notification/notification.routes');

const app = express();

// Render (and most PaaS hosts) sit behind a reverse proxy. This makes
// req.ip / req.protocol reflect the real client instead of the proxy,
// which matters for rate limiting, logging, and secure cookies.
app.set('trust proxy', 1);

// --- Global middleware ---
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server / curl / Postman requests with no origin header
      if (!origin) return callback(null, true);
      if (CORS_ORIGINS.includes('*') || CORS_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (NODE_ENV !== 'test') {
  app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Serve uploaded files (profile pictures, documents)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Health check (point Render's health check at this path) ---
app.get('/health', (req, res) => res.status(200).json({ success: true, message: 'HRMS API is running' }));

// --- Module routes ---
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/notifications', notificationRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;

