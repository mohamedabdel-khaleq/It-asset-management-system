const Employee = require("../models/Employee");

const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Get All Employees
const getAllEmployee = catchAsync(async (req, res) => {

  const employees = await Employee.find();

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });

});


// Get Employee By ID
const getEmployeeById = catchAsync(async (req, res) => {

  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    throw new ApiError("Employee not found", 404);
  }

  res.status(200).json({
    success: true,
    data: employee,
  });

});


// Create Employee
const createEmployee = catchAsync(async (req, res) => {

  const {
    fullName,
    email,
    phone,
    department,
    jobTitle,
    status,
  } = req.body;


  if (!fullName || !email || !phone || !department || !jobTitle) {
    throw new ApiError(
      "All required fields must be provided",
      400
    );
  }


  const existingEmployee = await Employee.findOne({
    email,
  });


  if (existingEmployee) {
    throw new ApiError(
      "Email already exists",
      400
    );
  }


  const employee = await Employee.create({
    fullName,
    email,
    phone,
    department,
    jobTitle,
    status,
  });


  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee,
  });

});


// Update Employee
const updateEmployee = catchAsync(async (req, res) => {

  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!employee) {
    throw new ApiError(
      "Employee not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: employee,
  });

});


// Delete Employee
const deleteEmployee = catchAsync(async (req, res) => {

  const employee = await Employee.findByIdAndDelete(
    req.params.id
  );


  if (!employee) {
    throw new ApiError(
      "Employee not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });

});


module.exports = {
  getAllEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};