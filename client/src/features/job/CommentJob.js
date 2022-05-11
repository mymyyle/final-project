import CommentList from "features/comment/CommentList";
import CommentPost from "features/comment/CommentPost";
import useAuth from "hooks/useAuth";
import React from "react";

const CommentJob = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      Comment
      {isAuthenticated && <CommentPost />}
      <CommentList />
    </div>
  );
};

export default CommentJob;
