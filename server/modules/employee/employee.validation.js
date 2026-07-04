const Joi = require('joi');

// Fields an employee is allowed to edit on their own profile
const updateMyProfileSchema = Joi.object({
  phone: Joi.string().trim().allow(''),
  address: Joi.string().trim().allow(''),
});

// Fields an admin can edit on any employee
const updateEmployeeAdminSchema = Joi.object({
  personalDetails: Joi.object({
    fullName: Joi.string().trim().allow(''),
    phone: Joi.string().trim().allow(''),
    address: Joi.string().trim().allow(''),
    dob: Joi.date(),
    gender: Joi.string().valid('male', 'female', 'other', ''),
  }),
  jobDetails: Joi.object({
    designation: Joi.string().trim().allow(''),
    department: Joi.string().trim().allow(''),
    joiningDate: Joi.date(),
    employmentType: Joi.string().valid('full-time', 'part-time', 'contract', 'intern', ''),
  }),
  salaryStructure: Joi.object({
    basic: Joi.number().min(0),
    hra: Joi.number().min(0),
    allowances: Joi.number().min(0),
    deductions: Joi.number().min(0),
  }),
});

module.exports = { updateMyProfileSchema, updateEmployeeAdminSchema };
