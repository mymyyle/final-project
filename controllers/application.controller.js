const applicationController = {};
const { sendResponse, catchAsync, throwError } = require("../helpers/utils");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

// 1. user can apply = job id(author k dc, ktra có tạo schema cho jobId chưa)
applicationController.applyJob = catchAsync(async (req, res, next) => {
  const { message = "" } = req.body;
  const { jobId } = req.params;
  const { currentUserId } = req;

  const job = await Job.findOne({ _id: jobId, isDeleted: false });
  if (!job) throwError(404, "job by id not found", "apply error");
  let application = await Application.findOne({
    jobId,
    candidateId: currentUserId,
  });
  if (application)
    throwError(400, "candidate has applied this job", "apply error");
  application = await Application.create({
    jobId,
    employerId: job.authorId,
    candidateId: currentUserId,
    message,
  });
  return sendResponse(res, 200, true, application, null, "apply successful");
});

// 2. user can cancel job, accesstoken, jobid
applicationController.cancelJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const { currentUserId } = req;

  const job = await Job.findOne({ _id: jobId, isDeleted: false });
  if (!job) throwError(404, "job by id not found", "cancel error");

  let application = await Application.findOne({
    jobId,
    candidateId: currentUserId,
  });
  if (!application)
    throwError(
      404,
      "user's application for this job not found",
      "cancel error"
    );
  application = await Application.deleteOne({
    jobId,
    candidateId: currentUserId,
  });

  return sendResponse(
    res,
    200,
    true,
    application,
    null,
    "cancel job successful"
  );
});

// 5. author can response request
applicationController.respondRequest = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const { currentUserId } = req;
  const { candidateId, status } = req.body;

  if (!candidateId)
    throwError(400, "missing candidateId", "respond request error");
  if (
    !status ||
    (status !== "approved" && status !== "rejected" && status !== "pending")
  )
    throwError(400, "incorrect status ", "respond request error");

  const job = await Job.findOne({ _id: jobId, isDeleted: false });
  if (!job) throwError(404, "job by id not found", "respond request error");

  const application = await Application.findOne({
    jobId,
    employerId: currentUserId,
    candidateId,
  });
  if (!application)
    throwError(404, "application not found", "respond request error");
  application.status = status;
  await application.save();
  return sendResponse(
    res,
    200,
    true,
    application,
    null,
    "respond request successful"
  );
});

// 4. author can get all applications By JobId (only employer) search by status
applicationController.getAllApplicationsByJobId = catchAsync(
  async (req, res, next) => {
    const { jobId } = req.params;
    const { currentUserId } = req;
    let { status, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    status = status?.toLowerCase();

    const job = await Job.findOne({ _id: jobId, isDeleted: false });
    if (!job)
      throwError(
        404,
        "job by id not found",
        "get all application by jobId error"
      );

    const filterCondition = [{ jobId }, { employerId: currentUserId }];

    if (status === "approved" || status === "pending" || status === "rejected")
      filterCondition.push({ status });

    const filterCriteria = { $and: filterCondition };

    const count = await Application.countDocuments(filterCriteria);
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    const applicationList = await Application.find(filterCriteria)
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit);

    return sendResponse(
      res,
      200,
      true,
      { applicationList, totalPage },
      null,
      "get all applications by job Id successful (employer login required)"
    );
  }
);

// 6. user can get all job list which user has applied
applicationController.getAllOwnJobApplication = catchAsync(
  async (req, res, next) => {
    const { currentUserId } = req;
    let { status, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    status = status?.toLowerCase();

    const filterCondition = [{ candidateId: currentUserId }];

    if (status === "approved" || status === "pending" || status === "rejected")
      filterCondition.push({ status });

    const filterCriteria =
      filterCondition.length > 1
        ? { $and: filterCondition }
        : { candidateId: currentUserId };

    const count = await Application.countDocuments(filterCriteria);
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    const applicationList = await Application.find(filterCriteria)
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit);

    return sendResponse(
      res,
      200,
      true,
      { applicationList, totalPage },
      null,
      "get all applications of user successful"
    );
  }
);

module.exports = applicationController;
