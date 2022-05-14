import { Box } from "@mui/system";
import {
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React from "react";

const Welcome = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ m: "3rem auto", fontFamily: "Lato, sans-serif", lineHeight: "1.6" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          component="img"
          src="https://i.imgur.com/YB7qE8w.png"
          alt=""
          sx={{ width: { sm: "100%" } }}
        />
        <Stack spacing={2.5}>
          <Typography variant="b1" sx={{ color: "#ff7675", fontWeight: 650 }}>
            _________ Welcome to our Community
          </Typography>
          <Typography
            // variant="h3"
            sx={{ fontWeight: 800, fontSize: "45px", lineHeight: "60px" }}
          >
            Helping each other can make world better
          </Typography>

          <Typography variant="b1 " sx={{ color: "#707876" }}>
            Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed
            do eiusmod tempor incididunt ut labore et simply free text dolore
            magna aliqua lonm andhn.
          </Typography>
          <Box
            id="mission-story"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Box id="mission">
              <Typography
                sx={{
                  mb: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowCircleRightIcon
                  htmlColor="#ff7675"
                  sx={{ fontSize: "30px" }}
                />
                <Typography
                  component="span"
                  sx={{ ml: "0.75rem", fontWeight: 600 }}
                >
                  Our Mission
                </Typography>
              </Typography>

              <Typography variant="b1 " sx={{ color: "#707876" }}>
                Lorem ipsum dolor sit amet not is consectetur notted.
              </Typography>
            </Box>
            <Box id="story">
              <Typography
                sx={{
                  mb: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowCircleRightIcon
                  htmlColor="#ff7675"
                  sx={{ fontSize: "30px" }}
                />
                <Typography
                  component="span"
                  sx={{ ml: "0.75rem", fontWeight: 600 }}
                >
                  Our Story
                </Typography>
              </Typography>

              <Typography variant="b1 " sx={{ color: "#707876" }}>
                Lorem ipsum dolor sit amet not is consectetur notted.
              </Typography>
            </Box>
          </Box>
          <Box id="charity">
            <Typography sx={{ fontWeight: 600, mb: "0.5rem" }}>
              Charity
            </Typography>
            <Box
              sx={{
                width: "90%",
                height: "15px",
                bgcolor: "#eff5f4",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  width: "53%",
                  height: "15px",
                  bgcolor: "#ff7675",
                  borderRadius: "8px",
                }}
              />
              <Typography
                sx={{ ml: "53%", color: "#707876", fontSize: "16px" }}
              >
                53%
              </Typography>
            </Box>
          </Box>
          <Box id="Donations">
            <Typography sx={{ fontWeight: 600, mb: "0.5rem" }}>
              Donations
            </Typography>
            <Box
              sx={{
                width: "90%",
                height: "15px",
                bgcolor: "#eff5f4",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{
                  width: "79%",
                  height: "15px",
                  bgcolor: "#ff7675",
                  borderRadius: "8px",
                }}
              />
              <Typography
                sx={{ ml: "79%", color: "#707876", fontSize: "16px" }}
              >
                79%
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Welcome;
