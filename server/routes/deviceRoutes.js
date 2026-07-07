const express = require("express");
const router = express.Router();

const deviceController = require("../controllers/deviceController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  deviceController.createDevice
);

router.get(
  "/",
  authMiddleware,
  deviceController.getAllDevices
);

router.get(
  "/:id",
  authMiddleware,
  deviceController.getDeviceById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deviceController.updateDevice
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deviceController.deleteDevice
);

module.exports = router;