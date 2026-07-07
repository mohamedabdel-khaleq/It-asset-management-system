const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/assignmentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  assignmentController.createAssignment
);

router.get(
  "/",
  authMiddleware,
  assignmentController.getAllAssignments
);

router.get(
  "/:id",
  authMiddleware,
  assignmentController.getAssignmentById
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  assignmentController.updateAssignment
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  assignmentController.deleteAssignment
);

module.exports = router;