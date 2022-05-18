import { Box } from "@mui/system";
import { getJob } from "features/job/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchInput from "components/SearchInput";
import Autocomplete from "@mui/material/Autocomplete";
import JobItem from "features/job/JobItem";
import dataLocation from "local.json";
import AllJobMap from "features/map/AllJobMap";
const LIMIT = 6;
const Jobs = () => {
  const dispatch = useDispatch();
  const { jobIds, jobs, totalPages, totalJobs } = useSelector(
    (state) => state.job
  );

  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);

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
  }, [filterName, filterCategory, filterLocation, filterType, page, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
    setPage(1);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: { xs: "auto", md: "0.5rem auto" },
        minHeight: "80vh",
      }}
    >
      <Stack spacing={3}>
        <AllJobMap />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchInput
            placeholder={`Search by Job's Name`}
            handleSubmit={handleSubmit}
          />

          <Stack
            spacing={0.5}
            sx={{
              mt: "0.5rem",
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "flex-ends",
            }}
          >
            <Autocomplete
              id="search-type"
              onInputChange={(event, newInputValue) => {
                setFilterType(newInputValue);
                setPage(1);
              }}
              options={["Full time", "Part time", "Temporary"]}
              size={"small"}
              style={{ width: 200, marginRight: 25 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by Type"
                  InputProps={{
                    ...params.InputProps,
                    style: { height: 40 },
                  }}
                />
              )}
            />
            <Autocomplete
              id="search-category"
              size={"small"}
              style={{ width: 200, marginRight: 25 }}
              onInputChange={(event, newInputValue) => {
                setFilterCategory(newInputValue);
                setPage(1);
              }}
              options={["Community", "Environment", "Healthcare"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by Category"
                  InputProps={{
                    ...params.InputProps,
                    style: { height: 40 },
                  }}
                />
              )}
            />

            {dataLocation && (
              <Autocomplete
                id="search-location"
                onInputChange={(event, newInputValue) => {
                  setFilterLocation(newInputValue);
                  setPage(1);
                }}
                size={"small"}
                style={{ width: 200, marginRight: 25 }}
                options={dataLocation.map((location) => location.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Location"
                    InputProps={{
                      ...params.InputProps,
                      style: { height: 40 },
                    }}
                  />
                )}
              />
            )}
          </Stack>
        </Box>
        <Typography
          variant="subtitle"
          sx={{
            color: "text.secondary",
            m: "1rem 0 0 1.7rem",
            alignSelf: "start",
          }}
        >
          {totalJobs > 1
            ? `${totalJobs}  opportunities found`
            : totalJobs === 1
            ? `${totalJobs} opportunity found`
            : "No opportunity found"}
        </Typography>
        <Grid container sx={{ margin: "auto" }}>
          {jobIds.map((jobId) => (
            <Grid
              key={jobId}
              item
              lg={6}
              xs={12}
              sx={{ padding: 0, mb: "3rem" }}
            >
              <JobItem job={jobs[jobId]} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{ alignSelf: "center" }}
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
    </Container>
  );
};

export default Jobs;
