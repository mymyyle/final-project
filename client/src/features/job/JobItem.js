import { Avatar, Card, Chip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import { fToNow } from "utils/formatTime";
const JobItem = ({ job }) => {
  const { type } = job;
  return (
    <div>
      <Card
        sx={{
          mb: "1rem",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center",
          padding: "1rem 2rem ",
          maxWidth: "700px",
          borderRadius: "15px",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={job.authorId.avatarUrl}
          sx={{ width: 80, height: 80, alignSelf: "start" }}
        />
        <Box sx={{ ml: "1.5rem" }}>
          <Link to={`/job/${job._id}`}>
            <Typography variant="h6" color="#3d3d3d" sx={{ fontWeight: 550 }}>
              {job.name}
            </Typography>
          </Link>
          <Box
            sx={{
              m: "0.5rem 0 1rem 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "16px",
              color: "#4b4b4b",
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <FmdGoodIcon /> {job.location} &nbsp;&nbsp;
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <AccessTimeIcon />
              {fToNow(job.createdAt)}&nbsp;&nbsp;
            </Typography>

            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <CategoryIcon />
              {job.category}
            </Typography>
          </Box>
          <Chip
            label={type}
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              padding: "0.25rem 0.5rem",
              border: "2px solid",
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
    </div>
  );
};

export default JobItem;
