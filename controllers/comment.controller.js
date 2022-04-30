const commentController = {};

// 1. User can create a comment to job post
commentController.createComment = (req, res, next) => {};

// 2. Author of Comment can update that comment
commentController.editComment = (req, res, next) => {};

// 3. Author of Comment can delete that comment
commentController.deleteComment = (req, res, next) => {};

// 4. Employer can reply comment
commentController.replyCommentByEmployer = (req, res, next) => {};

// 5. user can see comment (not login required)
commentController.getAllCommentByJobId = (req, res, next) => {};

module.exports = commentController;
