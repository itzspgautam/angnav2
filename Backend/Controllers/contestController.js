const catchAsyncError = require("../Middleware/catchAsyncError");
const ContestModel = require("../Models/contestModel");
const ParticipateModel = require("../Models/participateModel");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const ErrorHandler = require("../Utils/errorHandler");
const transporter = require("../Config/nodeMailer");
const nodeConfig = require("../Config/nodeMailer");
const participateModel = require("../Models/participateModel");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadToAwsS3 = (bucket, uploadedFileNmae) =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: bucket,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, uploadedFileNmae + "_" + file.originalname);
      },
    }),
  });

exports.getAllContest = catchAsyncError(async (req, res) => {
  const contest = await ContestModel.find();
  res.status(201).json({ sucess: true, contest });
});

exports.getSingleContest = catchAsyncError(async (req, res, next) => {
  const contest = await ContestModel.findById(req.params.id);
  if (!contest) {
    return next(new ErrorHandler("Contest not found", 404));
  }
  res.status(201).json({ sucess: true, contest });
});

//new Participate
exports.participateContest = catchAsyncError(async (req, res, next) => {
  const contest = await ContestModel.findById(req.params.id);
  if (!contest) {
    return next(new ErrorHandler("Contest not found", 404));
  }
  const isAlreadyParticipated = await ParticipateModel.findOne({
    contest: req.params.id,
    contestant: req.user._id,
  });

  if (isAlreadyParticipated) {
    return next(new ErrorHandler("you have already participated.", 400));
  }

  const participateResult = await ParticipateModel.create({
    uploaded_data: {
      ...req.body,
    },
    contestant: req.user._id,
    contest: req.params.id,
  });
  const findResult = await ParticipateModel.findById(participateResult)
    .populate("contestant")
    .populate("contest");

  const transporter = nodeConfig();
  var mailOptions = {
    from: "ANGNA Contest Participation <jnvangna@gmail.com>",
    to: findResult.uploaded_data.email,
    subject: "ANGNA Participation Succesfull!",
    text: `hello ${findResult.uploaded_data.name}, You have been participated successfully in ANGNA Online contest - ${findResult.contest.title} .
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    } else {
    }
  });

  res.status(201).json({ sucess: true, participation: findResult });
});

//upload contest files
exports.uploadContestFile = catchAsyncError(async (req, res, next) => {
  const awsBucketName = "angna-contest-participation";
  const awsFileName = "contest_file_" + Date.now();
  let awsSeUploadedFile = null;
  const uploadSingle = await uploadToAwsS3(awsBucketName, awsFileName).single(
    "uploadedFile"
  );

  uploadSingle(req, res, (error) => {
    if (error) return next(new ErrorHandler(error.message, 400));
    awsSeUploadedFile = {
      public_id: req.file.key,
      url: req.file.location,
    };
    res.status(201).json({ sucess: true, file: awsSeUploadedFile });
  });
});

//is Already participated
exports.isAlreadyParticipated = catchAsyncError(async (req, res, next) => {
  const contest = await ContestModel.findById(req.params.id);

  if (!contest) {
    return next(new ErrorHandler("Contest not found", 404));
  }

  const isAlreadyParticipated = await ParticipateModel.findOne({
    contest: req.params.id,
    contestant: req.user._id,
  });
  if (isAlreadyParticipated) {
    res.status(200).json({
      sucess: true,
      message: "You are already participated.",
      participation: isAlreadyParticipated,
    });
  }
  return next(
    new ErrorHandler("You haven't participated in this contest.", 200)
  );
});

//get single participation
exports.getSingleParticipation = catchAsyncError(async (req, res, next) => {
  const participation = await ParticipateModel.findById(req.params.id)
    .populate("contestant")
    .populate("contest");

  if (!participation) {
    return next(new ErrorHandler("Not Found", 404));
  }

  res.status(200).json({
    success: true,
    participation: participation,
  });
});

//get My Participation
exports.myParticipation = catchAsyncError(async (req, res, next) => {
  const participation = await ParticipateModel.find({
    contestant: req.user._id,
  })
    .populate("contestant")
    .populate("contest");

  if (!participation) {
    return next(new ErrorHandler("Not Found", 404));
  }

  res.status(200).json({
    success: true,
    participation: participation,
  });
});

//admin routes
//Create Contest
exports.createContest = catchAsyncError(async (req, res, next) => {
  const contest = await ContestModel.create({
    ...req.body,
    expireDate: new Date(req.body.expireDate),
    createdBy: req.user._id,
  });
  res.status(201).json({ sucess: true, contest });
});

//update contest
exports.updateContest = catchAsyncError(async (req, res, next) => {
  const contest = await ContestModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json({ sucess: true, contest });
});

//delete contest
exports.deleteContest = catchAsyncError(async (req, res, next) => {
  const contest = await ContestModel.findById(req.params.id);

  if (!contest) {
    return next(new ErrorHandler("Contest not found", 404));
  }
  contest.remove();
  res.status(201).json({ sucess: true, contest });
});

//load parts
exports.loadAllParticipation = catchAsyncError(async (req, res, next) => {
  const parts = await participateModel
    .find()
    .populate("contest")
    .populate("contestant");
  res.status(201).json({ sucess: true, participations: parts });
});

//Delete Part
exports.deletePart = catchAsyncError(async (req, res, next) => {
  const part = await ParticipateModel.findById(req.params.id);
  if (!part) {
    return next(new ErrorHandler("Participation not found", 404));
  }
  part.remove();
  const parts = await participateModel
    .find()
    .populate("contest")
    .populate("contestant");
  res.status(201).json({ sucess: true, participations: parts });
});
