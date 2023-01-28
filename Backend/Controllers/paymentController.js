const catchAsyncError = require("../Middleware/catchAsyncError");
const PaymentModel = require("../Models/paymentModel");
const Razorpay = require("razorpay");
const ErrorHandler = require("../Utils/errorHandler");
var razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

//create payment order rzp
exports.createOrder = catchAsyncError(async (req, res, next) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
    });
    res.status(201).json({ status: order.status, order });
  } catch (error) {
    return next(new ErrorHandler(error.error.description, 400));
  }
});

//save success payments
exports.verifyAndSave = catchAsyncError(async (req, res, next) => {
  try {
    const payment = await razorpayInstance.orders.fetch(
      req.body.payment.razorpay_order_id
    );

    const chekIsPaid = await PaymentModel.find({
      order_id: req.body.payment.razorpay_order_id,
    });
    if (chekIsPaid.length > 0) {
      return next(new ErrorHandler("Invalid request", 400));
    }
    const savePayInfo = await PaymentModel.create({
      order_id: payment.id,
      amount: payment.amount,

      payment_id: req.body.payment.razorpay_payment_id,
      signature: req.body.payment.razorpay_signature,

      payer: {
        name: req.body.payment.payer.name,
        email: req.body.payment.payer.email,
        phone: req.body.payment.payer.phone,
        description: req.body.payment.payer.description,
      },
      rawData: { ...payment },
    });

    res.status(200).json({
      status: payment.status,
      payment: { ...payment, payer: req.body.payment.payer },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.getAllPayments = catchAsyncError(async (req, res, next) => {
  const payments = await PaymentModel.find();
  res.status(200).json({
    status: "success",
    payments: payments,
  });
});
