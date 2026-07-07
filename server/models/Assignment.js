const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee is required"],
    },

    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: [true, "Device is required"],
    },

    assignedDate: {
      type: Date,
      default: Date.now,
    },

    expectedReturnDate: {
      type: Date,
      required: [true, "Expected return date is required"],
    },

    returnedDate: {
      type: Date,
      default: null,
    },

    assignedBy: {
      type: String,
      required: [true, "Assigned by is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Assigned", "Returned"],
      default: "Assigned",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;