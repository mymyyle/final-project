import { Typography } from "@mui/material";
import CommentList from "features/comment/CommentList";
import CommentPost from "features/comment/CommentPost";
import useAuth from "hooks/useAuth";
import React from "react";

const CommentJob = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Typography variant="h5">Question & Answer</Typography>
      <Typography>Let me know if you have any questions</Typography>
      {isAuthenticated && <CommentPost />}
      <CommentList />
    </div>
  );
};

export default CommentJob;
