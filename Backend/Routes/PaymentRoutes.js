const express = require("express");
const {
  createOrder,
  verifyAndSave,
  getAllPayments,
} = require("../Controllers/paymentController");
const router = express.Router();
const isAdminAuth = require("../Middleware/isAdminAuth");

router.route("/payment").post(createOrder);
router.route("/payment/save").post(verifyAndSave);

router.route("/payments").get(isAdminAuth, getAllPayments);
module.exports = router;
