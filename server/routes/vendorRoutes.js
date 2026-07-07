const express = require("express");
const router = express.Router();

const vendorController = require("../controllers/vendorController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Vendor
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  vendorController.createVendor
);

// Get All Vendors
router.get(
  "/",
  authMiddleware,
  vendorController.getAllVendors
);

// Get Vendor By ID
router.get(
  "/:id",
  authMiddleware,
  vendorController.getVendorById
);

// Update Vendor
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  vendorController.updateVendor
);

// Delete Vendor
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  vendorController.deleteVendor
);

module.exports = router;