const express = require("express");
const applicationController = require("../controllers/application.controller");
const router = express.Router();
const { loginRequired } = require("../middlewares/authentication");

const {
  applyJob,
  cancelJob,
  getAllApplicationsByJobId,
  acceptRequest,
  getAcceptedListByJobId,
} = applicationController;

router.put("/apply/:jobId", loginRequired, applyJob);

router.delete("/cancel/:jobId", loginRequired, cancelJob);

router.get("/applications/:jobId", loginRequired, getAllApplicationsByJobId);

router.get("/me/accept/:jobId", loginRequired, getAcceptedListByJobId);

// req.body {userId in applications}
//employer
router.put("/:jobId", loginRequired, acceptRequest);

module.exports = router;
