const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect } = require("../middleware/auth");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", protect, postController.createPost);        // protected
router.put("/:id", protect, postController.updatePost);      // protected
router.delete("/:id", protect, postController.deletePost);   // protected

module.exports = router;


