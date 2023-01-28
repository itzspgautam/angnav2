const express = require("express");
const {
  createEventPost,
  loadEvents,
  filterEvent,
  createNewCategory,
  getAllCategories,
  loadSingleEvent,
  updateEventPost,
  deleteEventPost,
} = require("../Controllers/eventController");

const isAdminAuth = require("../Middleware/isAdminAuth");
const router = express.Router();

router.route("/events/new").post(isAdminAuth, createEventPost); //new Event

router.route("/events").get(loadEvents); //load all event
router
  .route("/events/:id")
  .get(loadSingleEvent)
  .put(isAdminAuth, updateEventPost)
  .delete(isAdminAuth, deleteEventPost);

router.route("/events/category/:id").get(filterEvent); //load filter event by categoty

router
  .route("/category")
  .get(getAllCategories) //get all category
  .post(isAdminAuth, createNewCategory); //create nre category

module.exports = router;
