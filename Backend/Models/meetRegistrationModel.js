const mongoose = require("mongoose");
const meetRegSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter full name."],
  },

  name: {
    type: String,
    required: [true, "Please enter full name."],
  },

  session: {
    type: String,
    required: [true, "Please Enter Session."],
  },

  batch: {
    type: String,
    required: [true, "Please Select Batch."],
  },

  designation: {
    type: String,
    required: [true, "Please enter Designation."],
  },

  email: {
    type: String,
    required: [true, "Please enter Email."],
  },

  phone: {
    type: String,
    required: [true, "Please enter Phone Number."],
  },

  year: {
    type: String,
    required: [true, "Please enter Year."],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Meet", meetRegSchema);
