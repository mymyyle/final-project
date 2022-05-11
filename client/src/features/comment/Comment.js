import { Box, Button, Typography } from "@mui/material";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { deleteComment } from "./commentSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CommentReply from "./CommentReply";
import EditQuestion from "./EditQuestion";

const Comment = ({ comment }) => {
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };
  const id = comment._id;
  console.log(`comment=========>`, comment);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>Q: {comment.content}</Box>
        <Box>
          {comment.isEdited && <Box component="span">Edited</Box>}
          {!comment.reply && <EditIcon onClick={() => setShowEdit(true)} />}

          {showEdit && <EditQuestion id={id} setShowEdit={setShowEdit} />}

          <Button onClick={() => handleDeleteComment(id)}>
            <DeleteForeverIcon />
          </Button>
        </Box>
      </Box>

      {comment.reply ? (
        <Typography> A: {comment.reply} </Typography>
      ) : (
        <CommentReply id={id} />
      )}
    </>
  );
};

export default Comment;
