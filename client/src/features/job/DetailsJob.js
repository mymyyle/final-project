import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const DetailsJob = () => {
  const { currentJob } = useSelector((state) => state.job);
  console.log(`=========>job`, currentJob);
  return (
    <div>
      <Typography> DetailsJob{currentJob.name}</Typography>
    </div>
  );
};

export default DetailsJob;
