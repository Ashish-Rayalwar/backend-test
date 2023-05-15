const {
  createPost,
  getPost,
  getPostById,
  deletePost,
  editPost,
} = require("../controller/postController");
const { verifyToken } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", verifyToken, createPost);
router.get("/", getPost);
router.get("/:id", getPostById);
router.put("/:id", verifyToken, editPost);
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
