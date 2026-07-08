const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Device = require("../models/Device");
const Assignment = require("../models/Assignment");
const Maintenance = require("../models/Maintenance");
const Vendor = require("../models/Vendor");

// Dashboard Report
const getDashboardReport = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();
    const totalDevices = await Device.countDocuments();
    const totalAssignments = await Assignment.countDocuments();
    const totalMaintenances = await Maintenance.countDocuments();
    const totalVendors = await Vendor.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalDepartments,
        totalDevices,
        totalAssignments,
        totalMaintenances,
        totalVendors,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Available Devices Report
const getAvailableDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      status: "Available",
    });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Assigned Devices Report
const getAssignedDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      status: "Assigned",
    });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Maintenance Devices Report
const getMaintenanceDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      status: "Maintenance",
    });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Retired Devices Report
const getRetiredDevices = async (req, res) => {
  try {
    const devices = await Device.find({
      status: "Retired",
    });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Warranty Expiring Devices Report
const getWarrantyExpiringDevices = async (req, res) => {
  try {
    const today = new Date();

    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);

    const devices = await Device.find({
      warrantyExpiry: {
        $gte: today,
        $lte: nextMonth,
      },
    });

    res.status(200).json({
      success: true,
      count: devices.length,
      data: devices,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  getDashboardReport,
  getAvailableDevices,
  getAssignedDevices,
  getMaintenanceDevices,
  getRetiredDevices,
  getWarrantyExpiringDevices,
};