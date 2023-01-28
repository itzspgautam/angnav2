const catchAsyncError = require("./catchAsyncError");
const admin = require("../Config/firebase-config");
const ErrorHandler = require("../Utils/errorHandler");
const userModel = require("../Models/userModel");

const isAdminAuth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new ErrorHandler(
        "Please Login to acces this resource : Unauthorised.",
        401
      )
    );
  }

  const userTokenVerify = await admin.auth().verifyIdToken(token);

  const user = await userModel.findOne({
    firebaseId: userTokenVerify.user_id,
    role: "admin",
  });

  if (!user) {
    return next(
      new ErrorHandler("You are not authorised to perform this action.", 401)
    );
  }

  req.user = user;
  next();
});

module.exports = isAdminAuth;
