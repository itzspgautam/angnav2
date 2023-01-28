const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const EventModel = require("../Models/eventModel");
const CategoryModel = require("../Models/categoryModel");

//create new event
exports.createEventPost = catchAsyncError(async (req, res, next) => {
  if (!req.body.title) return next(new ErrorHandler("Please enter title", 400));
  if (!req.body.description)
    return next(new ErrorHandler("Please enter Description", 400));
  if (!req.body.content)
    return next(new ErrorHandler("Please enter content", 400));
  if (!req.body.poster || !req.body.poster.url)
    return next(new ErrorHandler("Please select poster image", 400));
  if (!req.body.poster || !req.body.poster.url)
    return next(new ErrorHandler("Please select poster image", 400));
  if (!req.body.categories)
    return next(new ErrorHandler("Please select category", 400));

  try {
    const createdEvent = await EventModel.create({
      ...req.body,
      createdBy: req.user._id,
      createdDate: Date.now(),
    });

    const createdEventFinal = await EventModel.findById(createdEvent._id)
      .populate("categories")
      .populate("createdBy");

    res.status(201).json({ success: true, event: createdEventFinal });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//load all events
exports.loadEvents = catchAsyncError(async (req, res, next) => {
  try {
    const events = await EventModel.find()
      .populate("categories")
      .populate("createdBy");
    res.status(200).json({ success: true, events });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//load single events
exports.loadSingleEvent = catchAsyncError(async (req, res, next) => {
  try {
    const event = await EventModel.findById(req.params.id)
      .populate("categories")
      .populate("createdBy");
    res.status(200).json({ success: true, event });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//updateEvent
exports.updateEventPost = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const event = await EventModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  const updatedEvent = await EventModel.findById(event._id)
    .populate("categories")
    .populate("createdBy");
  res.status(201).json({ sucess: true, event: updatedEvent });
});

//Delete Event
exports.deleteEventPost = catchAsyncError(async (req, res, next) => {
  const event = await EventModel.findById(req.params.id);
  if (!event) {
    return next(new ErrorHandler("Contest not found", 404));
  }
  event.remove();
  const events = await EventModel.find()
    .populate("categories")
    .populate("createdBy");
  res.status(200).json({ success: true, events });
});
//load event filter by category
exports.filterEvent = catchAsyncError(async (req, res, next) => {
  try {
    const isCategoryTrue = await CategoryModel.findById(req.params.id);
    if (!isCategoryTrue)
      return next(new ErrorHandler("Category not found.", 404));

    const events = await EventModel.find({
      categories: req.params.id,
    }).populate("categories");
    res.status(200).json({ success: true, events });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

//create new category
exports.createNewCategory = catchAsyncError(async (req, res, next) => {
  if (!req.body.name)
    return next(new ErrorHandler("Please enter category name", 400));
  if (!req.body.icon || !req.body.icon.url)
    return next(new ErrorHandler("Please select icon image", 400));

  const newCategory = await CategoryModel.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(200).json({ success: true, newCategory });
});

//load all category
exports.getAllCategories = catchAsyncError(async (req, res, next) => {
  try {
    const allCategories = await CategoryModel.find();

    res.status(200).json({ success: true, categories: allCategories });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
