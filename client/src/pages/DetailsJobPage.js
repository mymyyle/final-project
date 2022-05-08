import LoadingScreen from "components/LoadingScreen";
import ApplyJob from "features/job/ApplyJob";
import CommentJob from "features/job/CommentJob";
import DetailsJob from "features/job/DetailsJob";
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
    <div>
      DetailsJobPage
      <DetailsJob />
      <ApplyJob />
      <CommentJob />
    </div>
  );
};

export default DetailsJobPage;
