const Device = require("../models/Device");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Get All Devices
const getAllDevices = catchAsync(async (req, res) => {

  const features = new ApiFeatures(Device.find(), req.query)
    .search([
      "assetTag",
      "deviceName",
      "brand",
      "model",
      "serialNumber",
    ])
    .filter()
    .sort()
    .paginate();

  const devices = await features.query;

  res.status(200).json({
    success: true,
    count: devices.length,
    data: devices,
  });

});


// Get Device By ID
const getDeviceById = catchAsync(async (req, res) => {

  const device = await Device.findById(req.params.id);

  if (!device) {
    throw new ApiError("Device not found", 404);
  }

  res.status(200).json({
    success: true,
    data: device,
  });

});


// Create Device
const createDevice = catchAsync(async (req, res) => {

  const {
    assetTag,
    deviceName,
    category,
    brand,
    model,
    serialNumber,
    purchaseDate,
    warrantyExpiry,
    status,
    notes,
  } = req.body;


  if (
    !assetTag ||
    !deviceName ||
    !category ||
    !brand ||
    !model ||
    !serialNumber
  ) {
    throw new ApiError(
      "All required fields must be provided",
      400
    );
  }


  const existingDevice = await Device.findOne({
    $or: [
      { assetTag },
      { serialNumber }
    ],
  });


  if (existingDevice) {
    throw new ApiError(
      "Asset Tag or Serial Number already exists",
      400
    );
  }


  const device = await Device.create({
    assetTag,
    deviceName,
    category,
    brand,
    model,
    serialNumber,
    purchaseDate,
    warrantyExpiry,
    status,
    notes,
  });


  res.status(201).json({
    success: true,
    message: "Device created successfully",
    data: device,
  });

});


// Update Device
const updateDevice = catchAsync(async (req, res) => {

  const device = await Device.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!device) {
    throw new ApiError(
      "Device not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Device updated successfully",
    data: device,
  });

});


// Delete Device
const deleteDevice = catchAsync(async (req, res) => {

  const device = await Device.findByIdAndDelete(
    req.params.id
  );


  if (!device) {
    throw new ApiError(
      "Device not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Device deleted successfully",
  });

});


module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};