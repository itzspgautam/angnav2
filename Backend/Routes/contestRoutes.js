const express = require("express");
const isAuthenticated = require("../Middleware/isAuth");
const {
  getAllContest,
  createContest,
  updateContest,
  deleteContest,
  getSingleContest,
  participateContest,
  isAlreadyParticipated,
  getSingleParticipation,
  uploadContestFile,
  myParticipation,
  loadAllParticipation,
  deletePart,
} = require("../Controllers/contestController");
const isAdminAuth = require("../Middleware/isAdminAuth");

const router = express.Router();

router.route("/contests").get(getAllContest);

router
  .route("/contests/:id/participate/uploadfile")
  .post(isAuthenticated, uploadContestFile);

router
  .route("/contests/:id/participate")
  .post(isAuthenticated, participateContest)
  .get(isAuthenticated, isAlreadyParticipated);

router
  .route("/contests/participation/:id")
  .get(getSingleParticipation)
  .delete(isAdminAuth, deletePart);

router.route("/contest/new").post(isAdminAuth, createContest);

router
  .route("/contest/profile/participation")
  .get(isAuthenticated, myParticipation);

router
  .route("/contest/:id")
  .put(isAdminAuth, updateContest)
  .delete(isAdminAuth, deleteContest)
  .get(getSingleContest);

router
  .route("/contest/participations/all")
  .get(isAdminAuth, loadAllParticipation);

module.exports = router;
