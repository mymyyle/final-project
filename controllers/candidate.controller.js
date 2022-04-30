const candidateController = {};

// candidate
// 1. user can apply = job id(author k dc, ktra có tạo schema cho jobId chưa)// candidate
candidateController.applyJob = (req, res, next) => {};

// 2. user can cancel job, accesstoken, jobid // candidate
candidateController.cancelJob = (req, res, next) => {};

// 3. user can get waiting List By UserId // candidate
candidateController.getWaitingListByUserId = (req, res, next) => {};

// 4. author can get all Candidates By JobId (ktra author?)
candidateController.getAllCandidatesByJobId = (req, res, next) => {};

// 5. author can accept request
candidateController.acceptRequest = (req, res, next) => {};

// 7. author get accepted List By JobId;
candidateController.getAcceptedListByJobId = (req, res, next) => {};

// 6. user can get accepted List By UserId // candidate (dki thanh cong tìm trong acceptedlist)
candidateController.getAcceptedListByUserId = (req, res, next) => {};

module.exports = candidateController;
