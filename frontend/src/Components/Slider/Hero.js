import { Image } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";

const Hero = (props) => {
  const sliderData = props.sliderData;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      showDots={true}
    >
      {sliderData.map((hero) => (
        <div key="hero._id">
          <NavLink to={hero.link}>
            <Image
              src={hero.banner.url}
              title={hero.title}
              alt={hero.title}
              loading="lazy"
            />
          </NavLink>
        </div>
      ))}
    </Carousel>
  );
};

export default Hero;
