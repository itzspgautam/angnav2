import { Box, Container, Image, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import { NavLink } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
  },
};

const IconSlider = ({ categories, cardType }) => {
  return (
    <Box mb="10" pb={{ base: "0px", md: "20px" }}>
      <Container
        maxW={"4xl"}
        py={{ base: 5, md: 10 }}
        px="0"
        bg={"yellow.300"}
        borderBottomRadius={{ base: "40%", md: "50%" }}
        h={{ base: "80px", md: "100px" }}
        mb="10"
      >
        <Container maxW={"4xl"}>
          <Carousel
            responsive={responsive}
            autoPlay={false}
            keyBoardControl={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {categories &&
              categories.map((category) => (
                <NavLink
                  key={category._id}
                  to={`/${cardType}/category/${category._id}`}
                >
                  <Box
                    _hover={{
                      bg: "yellow.200",
                      transition: "1s",
                    }}
                    h={{ base: "70px", md: "100px" }}
                    w={{ base: "70px", md: "100px" }}
                    bg="whiteAlpha.800"
                    boxShadow={"lg"}
                    borderRadius="10"
                    border="3px solid white"
                    display={"flex"}
                    flexDirection="column"
                    alignItems={"center"}
                    justifyContent="space-between"
                    p="2"
                  >
                    <Image
                      boxSize={{ base: "40px", md: "50px" }}
                      src={category.icon.url}
                      title={category.name}
                      alt={category.name}
                      loading="lazy"
                    />

                    <Text fontSize={{ base: "10px", md: "sm" }}>
                      {category.name}
                    </Text>
                  </Box>
                </NavLink>
              ))}
          </Carousel>
        </Container>
      </Container>
    </Box>
  );
};

export default IconSlider;
