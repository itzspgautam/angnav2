const mongoose = require("mongoose");
const validator = require("validator");

const participateSchema = mongoose.Schema({
  contestant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uploaded_data: {
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
    },
    group: {
      type: String,
      required: [true, "Please Select group."],
    },
    group_class: {
      type: String,
      required: [true, "Please Select Class."],
    },

    file: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contest",
  },

  submission_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participation", participateSchema);
