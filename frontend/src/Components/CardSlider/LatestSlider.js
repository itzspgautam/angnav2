import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

import PostCard from "../Cards/PostCard";

import Carousel from "react-multi-carousel";
import EventCard from "../Cards/EventCard";
import { NavLink } from "react-router-dom";

const LatestSlider = ({
  title,
  latestData,
  sm,
  md,
  lg,
  xl,
  renderComponent,
}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: xl,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: lg,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: md,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: sm,
    },
  };
  return (
    <Box mt="5">
      <Container maxW={"6xl"} p="0">
        <Flex justifyContent="center" alignItems={"center"}>
          <Box
            bg="blackAlpha.500"
            flexGrow="1"
            h="0.5"
            display={{ base: "block", md: "none" }}
          ></Box>
          <Box mx="2">
            <Center>
              <Text
                fontWeight={"600"}
                fontFamily="poppins"
                fontSize={{ base: "xl", md: "2xl" }}
                color="blackAlpha.900"
              >
                {title}
              </Text>
            </Center>
          </Box>
          <Box bg="blackAlpha.500" flexGrow="1" h="0.5"></Box>
        </Flex>
        <Box mt="5">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            infinite={true}
            arrows={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {renderComponent === "PostCard" &&
              latestData.map((post) => (
                <PostCard type="slider" key={post._id} post={post} />
              ))}

            {renderComponent === "EventCard" &&
              latestData.map((post) => (
                <EventCard type="slider" key={post._id} post={post} />
              ))}
          </Carousel>
        </Box>

        <Flex justifyContent="center" alignItems={"center"}>
          <Box mt="5">
            <Center>
              <NavLink
                to={
                  renderComponent === "EventCard"
                    ? "/events"
                    : renderComponent === "PostCard"
                    ? "/updates"
                    : ""
                }
              >
                <Text fontWeight={"600"} fontSize={"sm"} color="blackAlpha.600">
                  View All {">"}
                </Text>
              </NavLink>
            </Center>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LatestSlider;
