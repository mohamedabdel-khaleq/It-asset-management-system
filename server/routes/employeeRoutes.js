const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Employee
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  employeeController.createEmployee
);

// Get All Employees
router.get(
  "/",
  authMiddleware,
  employeeController.getAllEmployee
);

// Get Employee By ID
router.get(
  "/:id",
  authMiddleware,
  employeeController.getEmployeeById
);

// Update Employee
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  employeeController.updateEmployee
);

// Delete Employee
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  employeeController.deleteEmployee
);

module.exports = router;