const express = require("express");
const {
  getAllHeroSlider,
  createHeroSlider,
  createAoySlider,
  getAllAoySlider,
} = require("../Controllers/sliderController");
const router = express.Router();

const isAdminAuth = require("../Middleware/isAdminAuth");

router
  .route("/slider/hero")
  .get(getAllHeroSlider)
  .post(isAdminAuth, createHeroSlider);

router
  .route("/slider/aoy")
  .get(getAllAoySlider)
  .post(isAdminAuth, createAoySlider);

module.exports = router;
