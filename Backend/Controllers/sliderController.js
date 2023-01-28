const HeroModel = require("../Models/heroSliderModel");
const AoyModel = require("../Models/aoySliderModel");
const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");

//create Hero slider
exports.createHeroSlider = catchAsyncError(async (req, res, next) => {
  if (!req.body.title) return next(new ErrorHandler("Please enter title", 400));

  if (!req.body.banner || !req.body.banner.url)
    return next(new ErrorHandler("Please select slider image", 400));

  try {
    const heroSlider = await HeroModel.create({
      ...req.body,
      createdBy: req.user,
    });
    res.status(200).json({ success: true, hero: heroSlider });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//create aoy slider
exports.createAoySlider = catchAsyncError(async (req, res, next) => {
  if (!req.body.title) return next(new ErrorHandler("Please enter title", 400));

  if (!req.body.banner || !req.body.banner.url)
    return next(new ErrorHandler("Please select slider image", 400));

  try {
    const aoySlider = await AoyModel.create({
      ...req.body,
      createdBy: req.user,
    });
    res.status(200).json({ success: true, hero: aoySlider });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//get All hero Slider
exports.getAllHeroSlider = catchAsyncError(async (req, res, next) => {
  try {
    const heroSlider = await HeroModel.find();
    res.status(200).json({ success: true, hero: heroSlider });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//get all Aoy slider
exports.getAllAoySlider = catchAsyncError(async (req, res, next) => {
  try {
    const aoySlider = await AoyModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, aoy: aoySlider });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
