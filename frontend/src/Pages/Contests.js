import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaExclamationTriangle, FaSadCry } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { AllContestSkeleton } from "../Components/Skeleton/ContestSkeleton";
import { getAllContest } from "../Redux/Actions/ContestAction";

const Contests = () => {
  const Dispatch = useDispatch();
  const { loading, contests } = useSelector((state) => state.Contests);

  useEffect(() => {
    Dispatch(getAllContest());
  }, [Dispatch]);
  return (
    <Box py="5">
      <Helmet>
        <title>Contest | Angna </title>
        <meta
          name="description"
          content="Participate in contest and win exciting prize."
        />
        <link rel="canonical" href={window.location.origin + "/contest"} />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content="angna, contest, competition, online events, jnv garhwa"
        />

        <meta property="og:title" content="Contest | Angna" />
        <meta
          property="og:description"
          content="Participate in contest and win exciting prize."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/contest"} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/itzspgautam/image/upload/v1664637845/ANGNA/Og_images/t0mr4jmx4cmwmr7dbqvo.jpg"
        />
      </Helmet>
      <Container maxW="6xl">
        {loading ? (
          <AllContestSkeleton />
        ) : contests &&
          contests.filter((item) => Date.parse(item.expireDate) > Date.now())
            .length > 0 ? (
          <Box>
            <Flex justifyContent="center" alignItems={"center"}>
              <Box
                bg="blackAlpha.500"
                flexGrow="1"
                h="1"
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
                    Live Contest
                  </Text>
                </Center>
              </Box>
              <Box bg="blackAlpha.500" flexGrow="1" h="1"></Box>
            </Flex>

            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              gap={2}
            >
              {contests
                .filter((item) => Date.parse(item.expireDate) > Date.now())
                .map((contest) => (
                  <GridItem w="100%" key={contest._id}>
                    <NavLink to={`/contests/${contest._id}`}>
                      <Image
                        src={contest.banner.url}
                        alt={contest.title}
                        title={contest.title}
                        loading="lazy"
                      />
                    </NavLink>
                  </GridItem>
                ))}
            </Grid>
          </Box>
        ) : (
          <Center flexDir={"column"} p="10">
            <Text color="yellow.500">
              <FaSadCry size="70" />
            </Text>
            <Heading size="lg">You are late </Heading>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={"medium"}
              textAlign="center"
            >
              Date of all live contests has been expired.
            </Text>
          </Center>
        )}
      </Container>

      <Box bg="gray.400" mt="50vh" py="5">
        {loading ? (
          <AllContestSkeleton />
        ) : contests &&
          contests.filter((item) => Date.parse(item.expireDate) < Date.now())
            .length > 0 ? (
          <Container maxW="6xl">
            <Box>
              <Flex justifyContent="center" alignItems={"center"}>
                <Box
                  bg="blackAlpha.500"
                  flexGrow="1"
                  h="1"
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
                      Expired Contest
                    </Text>
                  </Center>
                </Box>
                <Box bg="blackAlpha.500" flexGrow="1" h="1"></Box>
              </Flex>

              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={2}
              >
                {contests
                  .filter((item) => Date.parse(item.expireDate) < Date.now())
                  .map((contest) => (
                    <GridItem
                      w="100%"
                      key={contest._id}
                      filter="auto"
                      blur="2px"
                    >
                      <Image
                        src={contest.banner.url}
                        alt={contest.title}
                        title={contest.title}
                        loading="lazy"
                        filter="grayscale(100%)"
                      />
                    </GridItem>
                  ))}
              </Grid>
            </Box>
          </Container>
        ) : null}
      </Box>
    </Box>
  );
};

export default Contests;
