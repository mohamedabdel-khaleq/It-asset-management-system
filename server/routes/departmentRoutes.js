const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  departmentController.createDepartment
);

router.get(
  "/",
  authMiddleware,
  departmentController.getAllDepartments
);

router.get(
  "/:id",
  authMiddleware,
  departmentController.getDepartmentById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  departmentController.updateDepartment
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  departmentController.deleteDepartment
);

module.exports = router;