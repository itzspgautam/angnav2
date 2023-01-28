const mongoose = require("mongoose");
const aoySliderSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter contest title."],
  },
  link: {
    type: String,
    default: "#",
  },
  banner: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Aoy", aoySliderSchema);
