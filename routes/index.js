const express = require("express");
const router = express.Router();

const userRouter = require("./user.api");
router.use("/user", userRouter);

const jobRouter = require("./job.api");
router.use("/job", jobRouter);

const commentRouter = require("./comment.api");
router.use("/comment", commentRouter);

const candidateRouter = require("./candidate.api");
router.use("/candidate", candidateRouter);

module.exports = router;
