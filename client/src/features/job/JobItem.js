import { Avatar, Card, Chip, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import { fToNow } from "utils/formatTime";
const JobItem = ({ job }) => {
  const { type } = job;
  const navigate = useNavigate();
  const handleClickName = () => {
    navigate(`/job/${job._id}`);
  };
  return (
    <Card
      sx={[
        {
          mb: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          padding: "1rem 2rem ",
          minHeight: "168px",
          width: { xs: "350px", sm: "650px", lg: "550px" },
          borderRadius: "15px",
          margin: "0 auto",
        },
        {
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          },
        },
      ]}
    >
      <Avatar
        alt={job.authorId.name}
        src={job.authorId.avatarUrl}
        sx={{ width: 90, height: 90, alignSelf: "start", mt: "0.75rem" }}
      />
      <Box
        sx={{
          ml: { md: "1.5rem", xs: "0.5rem" },
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          onClick={handleClickName}
          sx={[
            { fontWeight: 550 },
            {
              "&:hover": {
                cursor: "pointer",
              },
            },
          ]}
        >
          {job.name}
        </Typography>

        <Stack
          spacing={1}
          direction={{ sm: "row", xs: "column" }}
          sx={{
            m: "0.5rem 0 1rem 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
            alignItems: { sm: "center", xs: "flex-start" },
            fontSize: "16px",
            color: "#616161",
          }}
        >
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <FmdGoodIcon /> {job.location}
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <CategoryIcon />
            {job.category}
          </Typography>

          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon /> {fToNow(job.createdAt)}
          </Typography>
        </Stack>
        <Chip
          label={type}
          sx={{
            fontWeight: 500,
            fontSize: "16px",
            padding: "0.25rem 0.5rem",
            border: "2px solid",
            maxWidth: 130,
          }}
          variant="outlined"
          color={
            type === "Full time"
              ? "success"
              : type === "Temporary"
              ? "warning"
              : "secondary"
          }
        />
      </Box>
    </Card>
  );
};

export default JobItem;
