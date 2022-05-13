import {
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchInput from "components/SearchInput";
import { getOwnApplication } from "features/application/applicationSlice";
import OwnApplicationRow from "features/application/OwnApplicationRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ManageApplication = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const dispatch = useDispatch();
  const { applicationList, totalApplications } = useSelector(
    (state) => state.application
  );

  useEffect(() => {
    dispatch(
      getOwnApplication({
        status: filterName,
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [filterName, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };
  return (
    <div>
      <Typography variant="h6">Manage Application</Typography>
      <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <SearchInput
            placeholder={"Search by Status: approved, rejected or pending"}
            handleSubmit={handleSubmit}
          />
          <Typography
            variant="subtitle"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            {totalApplications > 1
              ? `${totalApplications} applications found`
              : totalApplications === 1
              ? `${totalApplications} application found`
              : "No application found"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TablePagination
            sx={{
              "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                {
                  display: { xs: "none", md: "block" },
                },
            }}
            component="div"
            count={totalApplications ? totalApplications : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Job's Name</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Application's Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicationList?.map((application) => (
                <TableRow
                  key={application._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <OwnApplicationRow application={application} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ManageApplication;
