const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter contest title."],
  },
  description: {
    type: String,
    required: [true, "Please enter description."],
  },

  content: {
    type: String,
    required: [true, "Please enter contents."],
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

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post_Category",
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

module.exports = mongoose.model("Post", postSchema);
