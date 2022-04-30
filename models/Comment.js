const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    authorCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    content: { type: String, required: true },
    reply: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
  },
  {
    timestamp: true,
  }
);

const Comment = Schema.model("Comments", commentSchema);
module.exports = Comment;

// _commentId:
// jobId:
// authorCommentId:
// content:
// reply:
// isEdited:
// timestamp
