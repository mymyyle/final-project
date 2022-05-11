import { Box, maxWidth } from "@mui/system";
import LoadingScreen from "components/LoadingScreen";
import { getJob } from "features/job/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Divider,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import SearchInput from "components/SearchInput";
import Autocomplete from "@mui/material/Autocomplete";
import LocationInput from "components/LocationInput";
import JobItem from "features/job/JobItem";

const LIMIT = 6;
const Jobs = () => {
  const dispatch = useDispatch();
  const { isLoading, jobIds, jobs, totalPages, totalJobs } = useSelector(
    (state) => state.job
  );

  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    dispatch(
      getJob({
        name: filterName,
        category: filterCategory,
        location: filterLocation,
        type: filterType,
        page,
        limit: LIMIT,
      })
    );
  }, [filterName, filterCategory, filterLocation, filterType, page]);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  console.log("filterType", filterType);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        minHeight: "80vh",
      }}
    >
      {/* <Box
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
      /> */}
      <SearchInput
        placeholder={`Search by Job's Name`}
        handleSubmit={handleSubmit}
      />
      <Grid container spacing={3} sx={{ margin: "auto" }}>
        <Grid item xs={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "50vh",
              }}
            >
              <Autocomplete
                id="search-type"
                onInputChange={(event, newInputValue) => {
                  setFilterType(newInputValue);
                }}
                options={["Full time", "Part time", "Temporary"]}
                sx={{ width: 200, height: 1.5 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Type"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />

              <Autocomplete
                id="search-category"
                onInputChange={(event, newInputValue) => {
                  setFilterCategory(newInputValue);
                }}
                options={["Community", "Environment", "Heath care"]}
                sx={{ width: 200, height: 1.5 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Category"
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />

              <LocationInput onInputChange={setFilterLocation} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalJobs > 1
                ? `${totalJobs} jobs found`
                : totalJobs === 1
                ? `${totalJobs} job found`
                : "No job found"}
            </Typography>
            {jobIds.map((jobId) => (
              <JobItem job={jobs[jobId]} />
            ))}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;
