const Assignment = require("../models/Assignment");

const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Get All Assignments
const getAllAssignments = catchAsync(async (req, res) => {

  const assignments = await Assignment.find()
    .populate("employee")
    .populate("device");


  res.status(200).json({
    success: true,
    count: assignments.length,
    data: assignments,
  });

});


// Get Assignment By ID
const getAssignmentById = catchAsync(async (req, res) => {

  const assignment = await Assignment.findById(req.params.id)
    .populate("employee")
    .populate("device");


  if (!assignment) {
    throw new ApiError(
      "Assignment not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    data: assignment,
  });

});


// Create Assignment
const createAssignment = catchAsync(async (req, res) => {

  const {
    employee,
    device,
    expectedReturnDate,
    assignedBy,
    notes,
  } = req.body;


  if (!employee || !device || !expectedReturnDate || !assignedBy) {
    throw new ApiError(
      "All required fields must be provided",
      400
    );
  }


  const assignment = await Assignment.create({
    employee,
    device,
    expectedReturnDate,
    assignedBy,
    notes,
  });


  res.status(201).json({
    success: true,
    message: "Device assigned successfully",
    data: assignment,
  });

});


// Update Assignment
const updateAssignment = catchAsync(async (req, res) => {

  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!assignment) {
    throw new ApiError(
      "Assignment not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Assignment updated successfully",
    data: assignment,
  });

});


// Delete Assignment
const deleteAssignment = catchAsync(async (req, res) => {

  const assignment = await Assignment.findByIdAndDelete(
    req.params.id
  );


  if (!assignment) {
    throw new ApiError(
      "Assignment not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Assignment deleted successfully",
  });

});


module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};