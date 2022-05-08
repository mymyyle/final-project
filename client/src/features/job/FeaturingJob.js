import LoadingScreen from "components/LoadingScreen";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJob } from "./jobSlice";

const FeaturingJob = () => {
  const dispatch = useDispatch();
  const { isLoading, error, jobIds, jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob({ isFeatured: true }));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {jobIds.map((jobId) => (
        <p>{jobs[jobId].name}</p>
      ))}
    </div>
  );
};

export default FeaturingJob;
