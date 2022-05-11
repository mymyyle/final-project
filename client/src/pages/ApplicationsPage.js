import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ApplicationRow from "features/application/ApplicationRow";
import { getApplicationsByJobId } from "features/application/applicationSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ApplicationsPage = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { applicationList } = useSelector((state) => state.application);
  useEffect(() => {
    dispatch(getApplicationsByJobId(jobId));
  }, []);
  const job = applicationList[1]?.jobId;

  return (
    <div>
      <Typography>Manage Resumes > {job?.name}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationList?.map((application) => (
              <TableRow
                key={application._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <ApplicationRow application={application} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApplicationsPage;
