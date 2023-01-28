import { Box, Image } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";

const AlumniYear = (props) => {
  const sliderData = props.sliderData;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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
      autoPlaySpeed={5000}
      keyBoardControl={true}
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      {sliderData.map((aoy) => (
        <Box mx={{ base: "1", md: 4 }} my="2" key="hero._id">
          <Image
            src={aoy.banner.url}
            title={aoy.title}
            alt={aoy.title}
            loading="lazy"
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default AlumniYear;
