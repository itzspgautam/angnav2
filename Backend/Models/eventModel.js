const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter contest title."],
  },
  description: {
    type: String,
    required: [true, "Please enter event description."],
  },
  content: {
    type: String,
    required: [true, "Please enter event content."],
  },
  videoUrl: {
    type: String,
  },
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  guestSpeaker: {
    type: String,
    required: [true, "Please Guest speaker's full name."],
  },
  guestSpeakerDes: {
    type: String,
    required: [true, "Please Guest speaker's designation."],
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
