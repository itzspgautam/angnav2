const express = require("express");
const {
  createNewPost,
  createNewPostCategory,
  getAllPostCategories,
  loadPosts,
  filterPost,
  loadSinglePost,
  updatePost,
  deletePost,
} = require("../Controllers/postController");
const isAdminAuth = require("../Middleware/isAdminAuth");
const router = express.Router();

router.route("/post").post(isAdminAuth, createNewPost).get(loadPosts);
router
  .route("/post/:id")
  .get(loadSinglePost)
  .put(isAdminAuth, updatePost)
  .delete(isAdminAuth, deletePost);

router.route("/post/filter/category/:id").get(filterPost);

router
  .route("/posts/category")
  .post(isAdminAuth, createNewPostCategory)
  .get(getAllPostCategories);

module.exports = router;
