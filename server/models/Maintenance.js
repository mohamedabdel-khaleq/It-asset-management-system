const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: [true, "Device is required"],
    },

    issue: {
      type: String,
      required: [true, "Issue is required"],
      trim: true,
      minlength: [5, "Issue must be at least 5 characters"],
      maxlength: [200, "Issue cannot exceed 200 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    reportedBy: {
      type: String,
      required: [true, "Reported By is required"],
      trim: true,
    },

    assignedTo: {
      type: String,
      trim: true,
      default: "",
    },

    maintenanceDate: {
      type: Date,
      default: Date.now,
    },

    completedDate: {
      type: Date,
      default: null,
    },

    cost: {
      type: Number,
      default: 0,
      min: [0, "Cost cannot be negative"],
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;