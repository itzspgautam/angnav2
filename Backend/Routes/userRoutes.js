const express = require("express");
const {
  login,
  logout,
  profile,
  update,
  getAllUsers,
} = require("../Controllers/userController");
const isAdminAuth = require("../Middleware/isAdminAuth");
const isAuthenticated = require("../Middleware/isAuth");

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile")
  .get(isAuthenticated, profile)
  .put(isAuthenticated, update);

router.route("/users").get(isAdminAuth, getAllUsers);

module.exports = router;
