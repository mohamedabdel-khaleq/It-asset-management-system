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

module.exports = {
  getDashboardReport,
};