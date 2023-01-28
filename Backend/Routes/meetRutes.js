const express = require("express");
const {
  registerAlumni,
  getAllRegisteredAlumni,
} = require("../Controllers/meetController");
const router = express.Router();
const isAdminAuth = require("../Middleware/isAdminAuth");

router.route("/meets").post(registerAlumni);
router.route("/meets/:year").get(getAllRegisteredAlumni);

module.exports = router;
