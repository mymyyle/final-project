const applicationController = {};
const { sendResponse, catchAsync, throwError } = require("../helpers/utils");
const Application = require("../models/application");
const Job = require("../models/Job");
const User = require("../models/User");

// 1. user can apply = job id(author k dc, ktra có tạo schema cho jobId chưa)
applicationController.applyJob = catchAsync(async (req, res, next) => {});

// 2. user can cancel job, accesstoken, jobid
applicationController.cancelJob = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    200,
    true,
    application,
    null,
    "cancel job successful"
  );
});

// 5. author can accept request
applicationController.acceptRequest = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    200,
    true,
    application,
    null,
    "accept request successful"
  );
});

// 4. author can get all applications By JobId (ktra author?)
applicationController.getAllApplicationsByJobId = catchAsync(
  async (req, res, next) => {}
);

// 7. author get accepted List By JobId;
applicationController.getAcceptedListByJobId = catchAsync(
  async (req, res, next) => {}
);

module.exports = applicationController;
