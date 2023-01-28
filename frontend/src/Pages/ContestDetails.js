import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Show,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  clearContestErrors,
  contestDetails,
} from "../Redux/Actions/ContestAction";
import ContestDetailsSkeleton from "../Components/Skeleton/ContestDetailsSkeleton";
import moment from "moment";
import { MdCheckCircle } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";

const ContestDetails = () => {
  const params = useParams();
  const Dispatch = useDispatch();
  const toast = useToast();
  const { loading, selectedContest, error } = useSelector(
    (state) => state.Contests
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    Dispatch(clearContestErrors());
  }, [error, Dispatch, toast]);

  useEffect(() => {
    if (selectedContest) {
      return;
    }
    Dispatch(contestDetails(params.id));
  }, [selectedContest, params.id, Dispatch]);

  return (
    <>
      <Helmet>
        {selectedContest && <title>{selectedContest.title} </title>}
        <meta
          name="description"
          content={selectedContest && selectedContest.description}
        />
        <link
          rel="canonical"
          href={
            window.location.origin +
            `/contests/${selectedContest && selectedContest._id}`
          }
        />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content={`angna, ${
            selectedContest && selectedContest.title
          }, contest, live contest, jnv garhwa, jnv garhwa alumni`}
        />

        <meta
          property="og:title"
          content={`Angna ${selectedContest && selectedContest.title}`}
        />
        <meta
          property="og:description"
          content={selectedContest && selectedContest.description}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={
            window.location.origin +
            `/contests/${selectedContest && selectedContest._id}`
          }
        />
        <meta
          property="og:image"
          content={selectedContest && selectedContest.banner.url}
        />
      </Helmet>
      <Box py={{ base: "2", md: "4" }}>
        <Container maxW="6xl" px="2">
          {loading ? (
            <ContestDetailsSkeleton />
          ) : (
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={2}
            >
              <GridItem
                w="100%"
                display={"flex"}
                flexDirection={{ base: "column-reverse", lg: "column" }}
              >
                <Box
                  bg="white"
                  borderRadius={"lg"}
                  boxShadow="sm"
                  p={2}
                  mt={{ base: "5", lg: "0" }}
                >
                  <Heading as={"h1"} size={{ base: "md", md: "lg" }}>
                    {selectedContest && selectedContest.title}
                  </Heading>
                  <Divider orientation="horizontal" my="2" />
                  <Text fontSize={{ base: "sm", md: "md" }} p="2" mt="2">
                    <b>Last Date of submission:</b>{" "}
                    {selectedContest &&
                      moment(selectedContest.expireDate).format(
                        "MMM Do, YYYY, h:m:s a"
                      )}
                  </Text>
                  <Text>{selectedContest && selectedContest.description}</Text>
                </Box>
                <Image
                  src={selectedContest && selectedContest.banner.url}
                  alt={selectedContest && selectedContest.title}
                  title={selectedContest && selectedContest.title}
                  loading="lazy"
                />

                <Show above="md">
                  {selectedContest &&
                  Date.parse(selectedContest.expireDate) < Date.now() ? (
                    <Button
                      colorScheme={"yellow"}
                      mt="5"
                      w="100%"
                      size="lg"
                      disabled
                    >
                      PARTICIPATION CLOSED
                    </Button>
                  ) : (
                    <NavLink to="participate">
                      <Button colorScheme={"yellow"} mt="5" w="100%" size="lg">
                        PARTICIPATE NOW
                      </Button>
                    </NavLink>
                  )}
                </Show>
              </GridItem>
              <GridItem w="100%">
                <Box
                  bg="white"
                  borderRadius={"lg"}
                  boxShadow="sm"
                  p="1"
                  h="100%"
                >
                  <Tabs variant="unstyled" isFitted>
                    <TabList>
                      <Tab
                        _selected={{ color: "black", bg: "yellow.400" }}
                        borderRadius="md"
                      >
                        <Text fontWeight={"bold"} fontSize="md">
                          Details
                        </Text>
                      </Tab>
                      <Tab
                        _selected={{ color: "white", bg: "green.600" }}
                        borderRadius="md"
                      >
                        <Text fontWeight={"bold"} fontSize="md">
                          Rules
                        </Text>
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel p="1" mt="4">
                        <Box>
                          <Flex
                            bg="gray.800"
                            p="2"
                            borderRadius={"5px 5px 0 0 "}
                          >
                            <Box w="20%">
                              <Text
                                fontSize={{ base: "14px" }}
                                fontWeight={"bold"}
                                color="white"
                              >
                                Group
                              </Text>
                            </Box>
                            <Divider orientation="vertical" color={"white"} />
                            <Box w="25%">
                              <Text
                                fontWeight={"bold"}
                                color="white"
                                fontSize={{ base: "14px" }}
                              >
                                Class
                              </Text>
                            </Box>
                            <Box w="55%">
                              <Text
                                fontWeight={"bold"}
                                color="white"
                                fontSize={{ base: "14px" }}
                              >
                                Topic
                              </Text>
                            </Box>
                          </Flex>
                          <Stack gap={0} mt="1">
                            {selectedContest &&
                              selectedContest.group.map((g) => (
                                <Flex
                                  bg="gray.200"
                                  p="1"
                                  px="1"
                                  key={g._id}
                                  alignItems="center"
                                >
                                  <Box w="20%">
                                    <Text
                                      ml="2"
                                      fontWeight={"semibold"}
                                      fontSize={{ base: "14px" }}
                                    >
                                      {g.group_name}
                                    </Text>
                                  </Box>
                                  <Box w="25%">
                                    <Text
                                      fontWeight={"bold"}
                                      fontSize={{ base: "14px" }}
                                    >
                                      {g.group_classes.map((c) => (
                                        <span key={c}>{c}th, </span>
                                      ))}
                                    </Text>
                                  </Box>
                                  <Box w="55%">
                                    <Text
                                      fontWeight={"medium"}
                                      fontSize={{ base: "14px" }}
                                    >
                                      {g.group_topic}
                                    </Text>
                                  </Box>
                                </Flex>
                              ))}
                          </Stack>
                        </Box>
                        <Box p="2" borderRadius={"lg"} mt="3">
                          <Heading as={"h2"} size={"md"}>
                            Authority Undersigned
                          </Heading>
                          <Box mt="3">
                            <VStack alignItems={"left"}>
                              <Text>
                                <b>Name:</b>{" "}
                                {selectedContest &&
                                  selectedContest.undersigned_Auth.name}
                              </Text>
                              <Text>
                                <b>Batch:</b>{" "}
                                {selectedContest &&
                                  selectedContest.undersigned_Auth.batch}
                              </Text>
                              <Text>
                                <b>Contact:</b>{" "}
                                {selectedContest &&
                                  selectedContest.undersigned_Auth.contact}
                              </Text>
                              <Link
                                _hover={{ textDecor: "none" }}
                                href={`https://wa.me/${
                                  selectedContest &&
                                  selectedContest.undersigned_Auth.contact
                                    .replace(" ", "")
                                    .replace("(", "")
                                    .replace(")", "")
                                }?message="jjjj`}
                                target="_blank"
                              >
                                <Button
                                  leftIcon={<FaWhatsapp fontSize={"20px"} />}
                                  colorScheme="whatsapp"
                                  variant="solid"
                                  size="sm"
                                >
                                  Get Help on Whatsapp
                                </Button>
                              </Link>
                            </VStack>
                          </Box>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <List spacing={3} mt="2">
                          {selectedContest &&
                            selectedContest.tAndC.map((term) => (
                              <ListItem key={term._id}>
                                <ListIcon
                                  as={MdCheckCircle}
                                  color="green.500"
                                />
                                {term.term}
                              </ListItem>
                            ))}
                        </List>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
              </GridItem>
            </Grid>
          )}
        </Container>
        <Show below="lg">
          {selectedContest &&
          Date.parse(selectedContest.expireDate) < Date.now() ? (
            <NavLink to="participate">
              <Button
                colorScheme={"yellow"}
                bottom="0"
                borderRadius={"none"}
                w="100%"
                size="lg"
                position={"fixed"}
                zIndex="1"
                disabled
              >
                PARTICIPATION CLOSED
              </Button>
            </NavLink>
          ) : (
            <NavLink to="participate">
              <Button
                colorScheme={"yellow"}
                bottom="0"
                borderRadius={"none"}
                w="100%"
                size="lg"
                position={"fixed"}
                zIndex="1"
              >
                PARTICIPATE NOW
              </Button>
            </NavLink>
          )}
        </Show>
      </Box>
    </>
  );
};

export default ContestDetails;
