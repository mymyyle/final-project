import React from "react";

const poster = [
  { img: "../assets/carousel/cover1.jpg", url: "/jobs" },
  { img: "../assets/carousel/cover2.png", url: "/post_job" },
];

const Carousel = () => {
  return (
    <>
      {poster.map((el) => (
        <img key={el.url} alt="cover" scr={el.img} />
      ))}
    </>
  );
};

export default Carousel;
