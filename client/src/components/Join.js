import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <Box
      sx={{
        bgcolor: "#ff7675",
        height: "43vh",
        padding: { sm: "4.5rem 4rem 4rem 4rem", xs: "3rem" },
        mb: "3rem",
      }}
    >
      <Box
        id="main content"
        sx={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          m: "0 auto",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { sm: "45px", xs: "30px" },
            lineHeight: 1.6,
            fontWeight: "700",
          }}
        >
          Join your hand with us for <br /> a better life and future
        </Typography>
        <Box
          onClick={handleClick}
          sx={{
            width: "13rem",
            height: "4rem",
            bgcolor: "#fff",
            borderRadius: "10px",
            p: "1rem",
          }}
        >
          <Box
            sx={{
              mb: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowCircleRightIcon htmlColor="black" sx={{ fontSize: "35px" }} />
            <Typography
              component="span"
              sx={{
                ml: "0.5rem",
                fontWeight: 500,
                fontSize: "25px",
                color: "black",
              }}
            >
              Register
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontWeight: 200,
            fontSize: "60px",
            color: "rgba(255,255,255,0.3)",
            position: "absolute",
            top: "-35px",
            left: "-10px",
          }}
        >
          Become a Volunteers
        </Typography>
      </Box>
    </Box>
  );
};

export default Join;
