const candidateController = {};
const { sendResponse, catchAsync } = require("../helpers/utils");

// candidate
// 1. user can apply = job id(author k dc, ktra có tạo schema cho jobId chưa)// candidate
candidateController.applyJob = catchAsync(async (req, res, next) => {});

// 2. user can cancel job, accesstoken, jobid // candidate
candidateController.cancelJob = catchAsync(async (req, res, next) => {});

// 3. user can get waiting List By UserId // candidate
candidateController.getWaitingListByUserId = catchAsync(
  async (req, res, next) => {}
);

// 4. author can get all Candidates By JobId (ktra author?)
candidateController.getAllCandidatesByJobId = catchAsync(
  async (req, res, next) => {}
);

// 5. author can accept request
candidateController.acceptRequest = catchAsync(async (req, res, next) => {});

// 7. author get accepted List By JobId;
candidateController.getAcceptedListByJobId = catchAsync(
  async (req, res, next) => {}
);

// 6. user can get accepted List By UserId // candidate (dki thanh cong tìm trong acceptedlist)
candidateController.getAcceptedListByUserId = catchAsync(
  async (req, res, next) => {}
);

module.exports = candidateController;
