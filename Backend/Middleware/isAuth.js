const catchAsyncError = require("./catchAsyncError");
const admin = require("../Config/firebase-config");
const ErrorHandler = require("../Utils/errorHandler");
const userModel = require("../Models/userModel");

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to acces this resource", 401));
  }

  const userTokenVerify = await admin.auth().verifyIdToken(token);
  req.user = await userModel.findOne({
    firebaseId: userTokenVerify.user_id,
  });
  next();
});

module.exports = isAuthenticated;
