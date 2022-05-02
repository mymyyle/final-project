const jobController = {};
const { sendResponse, catchAsync, throwError } = require("../helpers/utils");
const Job = require("../models/Job");

// 1. User can create a job
jobController.createJob = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const allows = [
    "name",
    "type",
    "category",
    "description",
    "location",
    "imageUrl",
    "detailedInformation",
  ];
  const newJob = {};
  newJob.authorId = currentUserId;
  allows.forEach((field) => {
    if (!req.body[field]) throwError(400, "Missing info", "create job error");
    else newJob[field] = req.body[field];
  });
  const job = await Job.create(newJob);
  return sendResponse(res, 200, true, job, null, "create job successful");
});

// 2. author can edit job: req.body
jobController.editJob = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const allows = [
    "name",
    "type",
    "category",
    "description",
    "location",
    "imageUrl",
    "detailedInformation",
    "status",
  ];
  const { id } = req.params;
  // console.log(`====>`, id);

  const newJob = await Job.findOne({ _id: id, isDeleted: false });
  // if (!newJob) throwError(400, "job not found", "edit job error");
  if (currentUserId !== newJob.authorId)
    throwError(401, "not author", "edit job error");
  allows.forEach((field) => {
    if (req.body[field]) newJob[field] = req.body[field];
  });

  await newJob.save();
  return sendResponse(res, 200, true, newJob, null, "edit job successful");
});

// 3. author can deactivate job
jobController.deleteJob = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUserId } = req;

  const newJob = await Job.findOne({ _id: id }, "+isDeleted");
  if (currentUserId !== newJob.authorId)
    throwError(401, "not author", "edit job error");
  newJob.isDeleted = true;
  await newJob.save();
  return sendResponse(res, 200, true, newJob, null, "delete job successful");
});

// 4. user can get a single job by id job
jobController.getSingleJobByJobId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const newJob = await Job.findOne({ _id: id, isDeleted: false });
  if (!newJob) throwError(400, "job not found", "get single job by id error");
  return sendResponse(
    res,
    200,
    true,
    newJob,
    null,
    "get Single Job By JobId successful"
  );
});

// 5.. User can see a list of all jobs (pagination)
// 6. user can sort by acs/decs date
// 7. user can search by city, name, 1 ngày / nhiều ngày, onl/off, Hình thức làm việc ...

jobController.getAllJob = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 5, ...filter } = { ...req.query };
  const filterCondition = [{ isDeleted: false }];

  const allows = ["name", "type", "category", "location", "status"];
  allows.forEach((field) => {
    if (filter[field] !== undefined) {
      filterCondition.push({
        [field]: { $regex: filter[field], $options: "i" },
      });
    }
  });
  const filterCriteria =
    filterCondition.length > 1
      ? { $and: filterCondition }
      : { isDeleted: false };

  console.log(filterCriteria);
  const count = await Job.countDocuments(filterCriteria);
  const totalPage = Math.ceil(count / limit);
  const offset = limit * (page - 1);
  // .sort({ createAt: -1 })
  const sort = filter.sort === "decs" ? 1 : -1;
  const jobList = await Job.find(filterCriteria)
    .sort({ createAt: sort })
    .skip(offset)
    .limit(limit);
  return sendResponse(
    res,
    200,
    true,
    { jobList, totalPage },
    null,
    "get all Job successful"
  );
});

// **search by authorId** for candidate flow
jobController.getJobByAuthorId = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 5, ...filter } = { ...req.query };
  const { currentUserId } = req;
  const filterCondition = [{ isDeleted: false }, { authorId: currentUserId }];

  const allows = ["name", "type", "category", "location", "status"];
  allows.forEach((field) => {
    if (filter[field] !== undefined) {
      filterCondition.push({
        [field]: { $regex: filter[field], $options: "i" },
      });
    }
  });
  const filterCriteria = { $and: filterCondition };

  console.log(filterCriteria);
  const count = await Job.countDocuments(filterCriteria);
  const totalPage = Math.ceil(count / limit);
  const offset = limit * (page - 1);
  const sort = filter.sort === "decs" ? 1 : -1;
  const jobList = await Job.find(filterCriteria)
    .sort({ createAt: sort })
    .skip(offset)
    .limit(limit);
  return sendResponse(
    res,
    200,
    true,
    { jobList, totalPage },
    null,
    "get all Job successful"
  );
});

module.exports = jobController;
