const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const admin = require("../Config/firebase-config");
const userModel = require("../Models/userModel");
const setCookie = require("../Utils/setCookie");

//login
exports.login = catchAsyncError(async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    //Verifying Bearer Toekn
    const userTokenVerify = await admin.auth().verifyIdToken(token);
    if (!userTokenVerify) {
      return next(new ErrorHandler("Invalid Request: Unauthorized", 401));
    }

    //cheking if user is registered or not
    const isRegistered = await userModel.findOne({
      firebaseId: userTokenVerify.user_id,
    });

    //if registered Log in th user
    if (isRegistered) {
      setCookie(res, token, 201, isRegistered);
      return;
    }

    //if not registered, insert user without valiation
    const saveUser = await userModel.collection.insertOne({
      role: "user",
      firebaseId: userTokenVerify.user_id,
      phone: userTokenVerify.phone_number,
      email: userTokenVerify.email || null,
      name: userTokenVerify.name || null,
      emailVerified: userTokenVerify.email_verified || false,
      avatar: { url: userTokenVerify.picture || null },
      authProvider: userTokenVerify.firebase.sign_in_provider || null,
    });
    //fetch user by inserted object resposnse by mongodb id
    const user = await userModel.findById(saveUser.insertedId);
    setCookie(res, token, 201, user);
    return;
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
});
//logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});
//get profile
exports.profile = catchAsyncError(async (req, res, next) => {
  res.status(201).json({ success: true, user: req.user });
});
//update profile
exports.update = catchAsyncError(async (req, res, next) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(201).json({ success: true, user: updatedUser });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//get all  user => admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  res.status(201).json({ success: true, users: users });
});
