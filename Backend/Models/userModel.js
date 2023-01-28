const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  firebaseId: {
    type: String,
    required: [true, "Invalid Request"],
  },
  authProvider: {
    type: String,
    required: [true, "Invalid Request"],
  },
  role: {
    type: String,
    default: "user",
  },
  name: {
    type: String,
    required: [true, "Please enter you full name."],
    minlength: [4, "Name is too short."],
  },
  phone: {
    type: Number,
    required: [true, "Please enter phone number."],
  },
  email: {
    type: String,
    required: [true, "Please enter email address."],
    validate: [validator.isEmail, "Please enter vaalid email address."],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    required: [true, "Please select gender."],
  },
  iAm: {
    iAm_type: {
      type: String,
    },
    iAm_designation: {
      type: String,
    },
  },

  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
