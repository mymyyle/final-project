import React, { useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSpring, animated } from "react-spring";

import useIntersectionObserver from "../hooks/useIntersectionObserver";

const WelcomeStats = ({ text, percent }) => {
  const theme = useTheme();
  const triggerRef = useRef();
  const dataRef = useIntersectionObserver(triggerRef);

  const statStyle = useSpring({
    config: { duration: 2000 },
    from: { opacity: 0 },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
    },
  });

  return (
    <Box ref={triggerRef}>
      <Typography sx={{ fontWeight: 600, mb: "0.5rem" }}>{text}</Typography>
      <animated.div style={statStyle}>
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
              width: percent,
              maxWidth: "100%",
              height: "15px",
              bgcolor: theme.palette.main,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          />
          <Typography
            sx={{
              ml: percent,
              color: theme.palette.main,
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {percent}
          </Typography>
        </Box>
      </animated.div>
    </Box>
  );
};

export default WelcomeStats;
