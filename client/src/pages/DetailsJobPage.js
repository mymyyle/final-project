import { Container, Grid, Stack } from "@mui/material";
import LoadingScreen from "components/LoadingScreen";
import ApplyJob from "features/job/ApplyJob";
import CommentJob from "features/job/CommentJob";
import DetailsJob from "features/job/DetailsJob";
import { Employer } from "features/job/Employer";
import { getJobById } from "features/job/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DetailsJobPage = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { isLoading } = useSelector((state) => state.job);
  console.log(jobId);
  useEffect(() => {
    dispatch(getJobById(jobId));
  }, [jobId]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Container
      sx={{
        m: "2rem auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <DetailsJob />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Employer />
          <ApplyJob />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CommentJob />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsJobPage;
