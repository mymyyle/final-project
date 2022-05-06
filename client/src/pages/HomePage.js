import React, { useEffect } from "react";
import Carousel from "../components/Carousel";

import apiService from "app/apiService";

const HomePage = () => {
  useEffect(() => {
    // console.log("goi api fetch all job");
    // const fetchData = async () => {
    //   const res = await apiService.get("/job/all");
    //   console.log("res :>> ", res);
    // };
    // fetchData();
  }, []);

  return (
    <div>
      Home
      <Carousel />
      <p></p>
    </div>
  );
};

export default HomePage;
