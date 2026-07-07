const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    assetTag: {
      type: String,
      required: [true, "Asset Tag is required"],
      unique: true,
      trim: true,
    },

    deviceName: {
      type: String,
      required: [true, "Device name is required"],
      trim: true,
      minlength: [2, "Device name must be at least 2 characters"],
      maxlength: [100, "Device name cannot exceed 100 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Laptop",
        "Desktop",
        "Printer",
        "Monitor",
        "Router",
        "Switch",
        "Server",
        "Other",
      ],
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },

    model: {
      type: String,
      required: [true, "Model is required"],
      trim: true,
    },

    serialNumber: {
      type: String,
      required: [true, "Serial number is required"],
      unique: true,
      trim: true,
    },

    purchaseDate: {
      type: Date,
    },

    warrantyExpiry: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Assigned",
        "Maintenance",
        "Retired",
      ],
      default: "Available",
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

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;