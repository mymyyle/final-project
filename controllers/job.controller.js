const jobController = {};
const { sendResponse, catchAsync } = require("../helpers/utils");

// 1. User can create a job
jobController.createJob = catchAsync(async (req, res, next) => {
  sendResponse(res, 400, true, null, null, "test");
});

// 2. author can edit job: req.body
jobController.editJob = catchAsync(async (req, res, next) => {});

// 3. author can deactivate job
jobController.deleteJob = catchAsync(async (req, res, next) => {});

// 4. user can get a single job by id job
jobController.getSingleJobByJobId = catchAsync(async (req, res, next) => {});

// 5.. User can see a list of all jobs (pagination)
// 6. user can sort by acs/decs date
// 7. user can search by city, name, 1 ngày / nhiều ngày, onl/off, Hình thức làm việc ...
// **search by authorId** for candidate flow
jobController.getAllJob = catchAsync(async (req, res, next) => {});

module.exports = jobController;
