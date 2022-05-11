import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentReply from "./CommentReply";
import { deleteComment, getCommentList } from "./commentSlice";
import { flexbox } from "@mui/system";
import EditQuestion from "./EditQuestion";
import useAuth from "hooks/useAuth";
import Comment from "./Comment";
const CommentList = () => {
  const dispatch = useDispatch();
  const { comments, commentIds } = useSelector((state) => state.comment);
  const { jobId } = useParams();
  useEffect(() => {
    dispatch(getCommentList(jobId));
  }, []);

  return (
    <div>
      CommentList
      {commentIds?.map((id) => {
        return <Comment key={id} comment={comments[id]} />;
      })}
    </div>
  );
};

export default CommentList;
