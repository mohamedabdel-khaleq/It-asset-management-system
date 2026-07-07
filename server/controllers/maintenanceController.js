const Maintenance = require("../models/Maintenance");

const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Get All Maintenance
const getAllMaintenances = catchAsync(async (req, res) => {

  const maintenances = await Maintenance.find()
    .populate("device");


  res.status(200).json({
    success: true,
    count: maintenances.length,
    data: maintenances,
  });

});


// Get Maintenance By ID
const getMaintenanceById = catchAsync(async (req, res) => {

  const maintenance = await Maintenance.findById(req.params.id)
    .populate("device");


  if (!maintenance) {
    throw new ApiError(
      "Maintenance not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    data: maintenance,
  });

});


// Create Maintenance
const createMaintenance = catchAsync(async (req, res) => {

  const {
    device,
    issue,
    description,
    reportedBy,
    assignedTo,
    cost,
  } = req.body;


  if (!device || !issue || !reportedBy) {
    throw new ApiError(
      "Device, issue and reportedBy are required",
      400
    );
  }


  const maintenance = await Maintenance.create({
    device,
    issue,
    description,
    reportedBy,
    assignedTo,
    cost,
  });


  res.status(201).json({
    success: true,
    message: "Maintenance created successfully",
    data: maintenance,
  });

});


// Update Maintenance
const updateMaintenance = catchAsync(async (req, res) => {

  const maintenance = await Maintenance.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!maintenance) {
    throw new ApiError(
      "Maintenance not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Maintenance updated successfully",
    data: maintenance,
  });

});


// Delete Maintenance
const deleteMaintenance = catchAsync(async (req, res) => {

  const maintenance = await Maintenance.findByIdAndDelete(
    req.params.id
  );


  if (!maintenance) {
    throw new ApiError(
      "Maintenance not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Maintenance deleted successfully",
  });

});


module.exports = {
  getAllMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};