const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.Router();

const {
  createComment,
  editComment,
  deleteComment,
  replyCommentByEmployer,
  getAllCommentByJobId,
} = commentController;

router.post("/create/:jobId", createComment);

router.put("/update/:id", editComment);

router.delete("/delete/:id", deleteComment);

router.get("/all/:jobId", getAllCommentByJobId);

router.put("/:id", replyCommentByEmployer);

module.exports = router;
