const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.router;
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

router.put("/:id", replyCommentByEmployer);

router.get("/all/:jobId", getAllCommentByJobId);

module.exports = router;
