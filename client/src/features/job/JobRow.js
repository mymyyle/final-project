import { Button, Chip, TableCell } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useDispatch } from "react-redux";
import { deleteJob } from "./jobSlice";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "utils/formatTime";

export const JobRow = ({ job }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId));
  };
  const handleEditJob = (jobId) => {
    navigate(`/job/edit/${jobId}`);
  };
  const handleClickName = (jobId) => {
    navigate(`/applications/${jobId}`);
  };
  console.log("job.createdAt", job.createdAt);
  return (
    <>
      <TableCell>
        <Button onClick={() => handleClickName(job._id)}>{job.name} </Button>
      </TableCell>
      <TableCell align="right">{fDateTime(job.createdAt)}</TableCell>
      <TableCell align="right">
        {job.status === "ongoing" ? (
          <Chip label="Ongoing" color="success" />
        ) : (
          <Chip label="Freezing Hiring" color="error" />
        )}
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => handleEditJob(job._id)}>
          <EditTwoToneIcon />
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => handleDeleteJob(job._id)}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </>
  );
};
