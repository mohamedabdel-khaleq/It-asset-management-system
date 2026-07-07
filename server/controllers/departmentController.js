const Department = require("../models/Department");

const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Get All Departments
const getAllDepartments = catchAsync(async (req, res) => {

  const departments = await Department.find();

  res.status(200).json({
    success: true,
    count: departments.length,
    data: departments,
  });

});


// Get Department By ID
const getDepartmentById = catchAsync(async (req, res) => {

  const department = await Department.findById(req.params.id);

  if (!department) {
    throw new ApiError("Department not found", 404);
  }

  res.status(200).json({
    success: true,
    data: department,
  });

});


// Create Department
const createDepartment = catchAsync(async (req, res) => {

  const {
    name,
    description,
    location,
    manager,
    status,
  } = req.body;


  if (!name || !description || !location || !manager) {
    throw new ApiError(
      "All required fields must be provided",
      400
    );
  }


  const existingDepartment = await Department.findOne({
    name,
  });


  if (existingDepartment) {
    throw new ApiError(
      "Department already exists",
      400
    );
  }


  const department = await Department.create({
    name,
    description,
    location,
    manager,
    status,
  });


  res.status(201).json({
    success: true,
    message: "Department created successfully",
    data: department,
  });

});


// Update Department
const updateDepartment = catchAsync(async (req, res) => {

  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!department) {
    throw new ApiError(
      "Department not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Department updated successfully",
    data: department,
  });

});


// Delete Department
const deleteDepartment = catchAsync(async (req, res) => {

  const department = await Department.findByIdAndDelete(
    req.params.id
  );


  if (!department) {
    throw new ApiError(
      "Department not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Department deleted successfully",
  });

});


module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};