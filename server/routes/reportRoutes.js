const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Dashboard Report
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin", "it_support"),
  reportController.getDashboardReport
);

// Available Devices Report
router.get(
  "/available-devices",
  authMiddleware,
  roleMiddleware("admin", "it_support"),
  reportController.getAvailableDevices
);

// Assigned Devices Report
router.get(
  "/assigned-devices",
  authMiddleware,
  roleMiddleware("admin", "it_support"),
  reportController.getAssignedDevices
);

// Maintenance Devices Report
router.get(
  "/maintenance-devices",
  authMiddleware,
  roleMiddleware("admin", "it_support"),
  reportController.getMaintenanceDevices
);

// Retired Devices Report
router.get(
  "/retired-devices",
  authMiddleware,
  roleMiddleware("admin", "it_support"),
  reportController.getRetiredDevices
);

// Warranty Expiring Devices Report
router.get(
  "/warranty-expiring",
  authMiddleware,
  roleMiddleware("admin", "it_support"),
  reportController.getWarrantyExpiringDevices
);

module.exports = router;