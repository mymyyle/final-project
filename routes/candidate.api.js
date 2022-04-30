const express = require("express");
const candidateController = require("../controllers/candidate.controller");
const router = express.router;
const {
  applyJob,
  cancelJob,
  getWaitingListByUserId,
  getAllCandidatesByJobId,
  acceptRequest,
  getAcceptedListByJobId,
  getAcceptedListByUserId,
} = candidateController;

router.put("/apply/:id", applyJob);

router.delete("/cancel/:id", cancelJob);

router.get("/waiting", getWaitingListByUserId);

router.get("/candidates/:id", getAllCandidatesByJobId);

// req.body {jobId,userId in candidates}
router.put("/", acceptRequest);

router.get("/accept/:jobId", getAcceptedListByJobId);

router.get("/accept/:userId", getAcceptedListByUserId);

module.exports = router;
