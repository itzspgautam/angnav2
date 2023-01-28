const catchAsyncError = require("../Middleware/catchAsyncError");
const meetRegistrationModel = require("../Models/meetRegistrationModel");
const ErrorHandler = require("../Utils/errorHandler");

exports.registerAlumni = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, session, batch, designation, year } = req.body;
  if (
    !name ||
    !session ||
    !batch ||
    !email ||
    !phone ||
    !designation ||
    !year
  ) {
    return next(new ErrorHandler("All fileds are required", 400));
  }

  try {
    const register = await meetRegistrationModel.create({
      name,
      email,
      phone,
      session,
      batch,
      designation,
      year,
    });
    res.status(201).json({
      success: true,
      registered: register,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.getAllRegisteredAlumni = catchAsyncError(async (req, res, next) => {
  const registeredAlumni = await meetRegistrationModel.find({
    year: req.params.year,
  });

  res.status(200).json({
    success: true,
    year: req.params.year,
    total: registeredAlumni.length,
    registred_alumni: registeredAlumni,
  });
});
