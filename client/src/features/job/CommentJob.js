import CommentList from "features/comment/CommentList";
import { CommentPost } from "features/comment/CommentPost";
import React from "react";

const CommentJob = () => {
  return (
    <div>
      Comment
      <CommentPost />
      <CommentList />
    </div>
  );
};

export default CommentJob;
