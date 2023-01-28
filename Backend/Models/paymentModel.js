const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
  order_id: {
    type: String,
    required: [true, "Order Id is required"],
  },
  payment_id: {
    type: String,
    required: [true, "Payment Id is required"],
  },
  signature: {
    type: String,
    required: [true, "signature is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  payer: {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },

  rawData: {},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
