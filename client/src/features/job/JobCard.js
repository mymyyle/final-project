import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { fDay, fTime } from "utils/formatTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const handleClickName = () => {
    navigate(`/job/${job._id}`);
  };
  return (
    <Card
      sx={[
        {
          height: 400,
          maxWidth: 370,
          position: "relative",
        },
        {
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.70) 0px 5px 15px",
          },
        },
      ]}
    >
      <Box
        component="img"
        src={job.imageUrl}
        alt="job img"
        sx={[{ height: "100%", width: "100%", objectFit: "cover" }]}
      />
      <Box
        sx={{
          textAlign: "center",
          height: 73,
          width: 70,
          backgroundColor: "#ff7675",
          position: "absolute",
          top: 0,
          left: "10%",
          zIndex: 2,
          fontWeight: 700,
          color: "white",
          fontSize: 22,
          borderRadius: "0 0 10px 10px",
        }}
      >
        {fDay(job.createdAt)}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          fontWeight: 700,
          color: "white",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0,1))",
          height: "50%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "65%",
            position: "absolute",
            bottom: "10%",
            left: "10%",
          }}
        >
          <Typography
            variant="b2"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTimeIcon /> {`${" "}`} {fTime(job.createdAt)}
          </Typography>
          <Button
            onClick={handleClickName}
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: 24,
              textTransform: "none",
              textAlign: "left",
              m: 0,
              p: 0,
              fontFamily: "Lato, sans-serif",
            }}
          >
            {job.name}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default JobCard;
