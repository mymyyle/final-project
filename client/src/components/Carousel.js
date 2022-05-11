import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Navigate, useNavigate } from "react-router-dom";

const poster = [
  { img: "./carousel/cover1.jpg", url: "/jobs" },
  { img: "./carousel/cover2.png", url: "/post_job" },
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath: "https://i.imgur.com/p8UUzyy.png",
    // "https://static.s123-cdn-static-d.com/uploads/5355863/normal_61215160ef18e.jpg",
    url: "/jobs",
  },
  {
    label: "Bird",
    imgPath: "https://i.imgur.com/BccXrLl.jpg",
    url: "/post_jobs",
  },
  {
    label: "Bali, Indonesia",
    imgPath: "https://i.imgur.com/JCpfplI.png",
    url: "/",
  },
];

const Carousel = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: "90vw",
        height: "70vh",
        flexGrow: 1,
        margin: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  // height: "70vh",
                  display: "block",
                  width: "90vw",
                  objectFit: "contain",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "30%",
          background: "transparent",
        }}
        steps={maxSteps}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
};

export default Carousel;
