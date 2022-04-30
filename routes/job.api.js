const express = require("express");
const jobController = require("../controllers/job.controller");
const router = express.Router();

const { createJob, editJob, deleteJob, getSingleJobByJobId, getAllJob } =
  jobController;

router.post("/create", createJob);

router.put("/update/:id", editJob);

router.delete("/delete/:id", deleteJob);

router.get("/:id", getSingleJobByJobId);

router.get("/all", getAllJob);

module.exports = router;
