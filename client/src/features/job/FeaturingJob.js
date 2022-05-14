import { Container, Grid, Typography } from '@mui/material';
import LoadingScreen from 'components/LoadingScreen';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from './JobCard';
import { getJob } from './jobSlice';

const FeaturingJob = () => {
  const dispatch = useDispatch();
  const { isLoading, error, jobIds, jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob({ page: 1, limit: 6, isFeatured: 'false' }));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '1rem',
          marginBottom: '1rem',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h3' sx={{ fontWeight: 600, mb: '1rem' }}>
          Upcoming Job
        </Typography>
        <Typography
          variant='b1'
          sx={{ color: '#ff7675', fontWeight: 600, mb: '1.5rem' }}
        >
          _____ Upcoming Job _____
        </Typography>
        <Grid container spacing={3}>
          {jobIds.map((jobId) => (
            <Grid key={jobId} item lg={4} sm={6} xs={12}>
              <JobCard job={jobs[jobId]} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FeaturingJob;