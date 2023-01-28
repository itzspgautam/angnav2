const catchAsyncError = require("../Middleware/catchAsyncError");
const PostCategoryModel = require("../Models/postCategory");
const postModel = require("../Models/postModel");
const PostModel = require("../Models/postModel");
const ErrorHandler = require("../Utils/errorHandler");

//create new post
exports.createNewPost = catchAsyncError(async (req, res, next) => {
  if (!req.body.title) return next(new ErrorHandler("Please enter title", 400));

  if (!req.body.description)
    return next(new ErrorHandler("Please enter Description", 400));

  if (!req.body.content)
    return next(new ErrorHandler("Please enter Contest", 400));

  if (!req.body.poster || !req.body.poster.url)
    return next(new ErrorHandler("Please select poster image", 400));

  if (!req.body.categories)
    return next(new ErrorHandler("Please select category", 400));

  try {
    const createdPost = await PostModel.create({
      ...req.body,
      createdBy: req.user._id,
      createdDate: Date.now(),
    });

    const createdPostFinal = await PostModel.findById(createdPost._id)
      .populate("categories")
      .populate("createdBy");

    res.status(201).json({ success: true, post: createdPostFinal });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//load all post
exports.loadPosts = catchAsyncError(async (req, res, next) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdDate: -1 })
      .populate("categories")
      .populate("createdBy");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//load single post
exports.loadSinglePost = catchAsyncError(async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id)
      .populate("categories")
      .populate("createdBy");
    res.status(200).json({ success: true, post });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//load post filter by category
exports.filterPost = catchAsyncError(async (req, res, next) => {
  try {
    const isCategoryTrue = await PostCategoryModel.findById(req.params.id);
    if (!isCategoryTrue)
      return next(new ErrorHandler("Category not found.", 404));

    const posts = await PostModel.find({
      categories: req.params.id,
    }).populate("categories");
    res.status(200).json({ success: true, posts });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

//create new post category
exports.createNewPostCategory = catchAsyncError(async (req, res, next) => {
  if (!req.body.name)
    return next(new ErrorHandler("Please enter category name", 400));
  if (!req.body.icon || !req.body.icon.url)
    return next(new ErrorHandler("Please select icon image", 400));

  const newPostCategory = await PostCategoryModel.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(200).json({ success: true, newPostCategory });
});

//load all post category
exports.getAllPostCategories = catchAsyncError(async (req, res, next) => {
  try {
    const allPostCategories = await PostCategoryModel.find();

    res.status(200).json({ success: true, postCategories: allPostCategories });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//update Post
exports.updatePost = catchAsyncError(async (req, res, next) => {
  const post = await postModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  const updatedPost = await postModel
    .findById(post._id)
    .populate("categories")
    .populate("createdBy");
  res.status(201).json({ sucess: true, post: updatedPost });
});

//Delete Post
exports.deletePost = catchAsyncError(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Contest not found", 404));
  }
  post.remove();
  const posts = await postModel
    .find()
    .populate("categories")
    .populate("createdBy");
  res.status(200).json({ success: true, posts });
});
