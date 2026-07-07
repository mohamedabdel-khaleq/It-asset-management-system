const Vendor = require("../models/Vendor");

const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");


// Get All Vendors
const getAllVendors = catchAsync(async (req, res) => {

  const vendors = await Vendor.find();

  res.status(200).json({
    success: true,
    count: vendors.length,
    data: vendors,
  });

});


// Get Vendor By ID
const getVendorById = catchAsync(async (req, res) => {

  const vendor = await Vendor.findById(req.params.id);


  if (!vendor) {
    throw new ApiError(
      "Vendor not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    data: vendor,
  });

});


// Create Vendor
const createVendor = catchAsync(async (req, res) => {

  const vendor = await Vendor.create(req.body);


  res.status(201).json({
    success: true,
    message: "Vendor created successfully",
    data: vendor,
  });

});


// Update Vendor
const updateVendor = catchAsync(async (req, res) => {

  const vendor = await Vendor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );


  if (!vendor) {
    throw new ApiError(
      "Vendor not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Vendor updated successfully",
    data: vendor,
  });

});


// Delete Vendor
const deleteVendor = catchAsync(async (req, res) => {

  const vendor = await Vendor.findByIdAndDelete(
    req.params.id
  );


  if (!vendor) {
    throw new ApiError(
      "Vendor not found",
      404
    );
  }


  res.status(200).json({
    success: true,
    message: "Vendor deleted successfully",
  });

});


module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};