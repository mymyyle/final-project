import { Box } from "@mui/system";
import LoadingScreen from "components/LoadingScreen";
import { getJob } from "features/job/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Jobs = () => {
  const dispatch = useDispatch();
  const { isLoading, jobIds, jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob({}));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Box
        component="img"
        src="https://lh3.googleusercontent.com/ueweWJJ20w6Ci9xXdASyBhjrbsvzfkN4ySDQrRFTy070max8k70UZP2VCqJJ9exH3X-nXCGRaxJh9N0K9gpEJw0urObyHqklKFsh9IwNmfzdXea4b_iTrmUC2-WebdPG2d9YVGg2"
        alr="find job"
        sx={{
          height: "60vh",
          display: "block",
          objectFit: "cover",
          objectPosition: "10px 10px",
          width: "90vw",
          margin: "auto",
        }}
      />
      {jobIds.map((jobId) => (
        <Link to={`/job/${jobId}`}>{jobs[jobId].name}</Link>
      ))}
    </>
  );
};

export default Jobs;
