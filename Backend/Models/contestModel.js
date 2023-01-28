const mongoose = require("mongoose");

const contestSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter contest title."],
  },
  description: {
    type: String,
    required: [true, "Please enter contest description."],
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
  category: {
    type: String,
    required: [true, "Please enter category"],
  },
  file_type: {
    type: String,
    required: [true, "Please select file type"],
  },
  undersigned_Auth: {
    name: {
      type: String,
      required: [true, "Please enter undersigned authority name"],
    },
    batch: {
      type: String,
      required: [true, "Please enter undersigned authority Batch."],
    },
    contact: {
      type: String,
      required: [true, "Please enter undersigned authority Contact number."],
    },
  },

  group: [
    {
      group_name: { type: String, required: true },
      group_classes: [{ type: String, required: true }],
      group_topic: { type: String, required: true },
    },
  ],

  tAndC: [
    {
      term: [{ type: String, required: true }],
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expireDate: {
    type: Date,
    required: [true, "Please specify end date of contest."],
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Contest", contestSchema);
