const express = require("express");
const router = express.Router();

const maintenanceController = require("../controllers/maintenanceController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  maintenanceController.createMaintenance
);

router.get(
  "/",
  authMiddleware,
  maintenanceController.getAllMaintenances
);

router.get(
  "/:id",
  authMiddleware,
  maintenanceController.getMaintenanceById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  maintenanceController.updateMaintenance
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  maintenanceController.deleteMaintenance
);

module.exports = router;