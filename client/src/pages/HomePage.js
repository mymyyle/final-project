import React, { useEffect } from "react";
import Carousel from "../components/Carousel";

import apiService from "app/apiService";
import FeaturingJob from "features/job/FeaturingJob";

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Carousel />
      <FeaturingJob />
    </div>
  );
};

export default HomePage;
