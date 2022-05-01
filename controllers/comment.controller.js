const commentController = {};
const { sendResponse, catchAsync } = require("../helpers/utils");

// 1. User can create a comment to job post
commentController.createComment = catchAsync(async (req, res, next) => {});

// 2. Author of Comment can update that comment:  isEdit:true
commentController.editComment = catchAsync(async (req, res, next) => {});

// 3. Author of Comment can delete that comment
commentController.deleteComment = catchAsync(async (req, res, next) => {});

// 4. Employer can reply comment
commentController.replyCommentByEmployer = catchAsync(
  async (req, res, next) => {}
);

// 5. user can see comment (not login required)
commentController.getAllCommentByJobId = catchAsync(
  async (req, res, next) => {}
);

module.exports = commentController;
