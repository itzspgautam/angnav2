import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Skeleton,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { CgCalendarDates, CgUser } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { loadEvent, loadSingleEvent } from "../Redux/Actions/EventAction";

const EventDetails = () => {
  const params = useParams();
  const Dispatch = useDispatch();
  const { eventLoading, events, selectedEvent } = useSelector(
    (state) => state.Event
  );

  function createMarkup(theExactHtmlWithTag) {
    return { __html: theExactHtmlWithTag };
  }

  useEffect(() => {
    Dispatch(loadSingleEvent(params.id));
  }, [Dispatch, params.id]);

  useEffect(() => {
    if (events) return;
    Dispatch(loadEvent());
  }, [Dispatch, events]);

  return (
    <Box py={{ base: "2", md: "4" }}>
      <Center mx={{ base: "2", md: "15%" }}>
        <Grid templateColumns="repeat(6, 1fr)" gap={2}>
          <GridItem colSpan={{ base: "6", md: "6", lg: "4" }}>
            <Box>
              <Box
                bg="white"
                borderRadius={"lg"}
                boxShadow="sm"
                p={{ base: "1", md: "2" }}
              >
                <AspectRatio
                  ratio={1920 / 1080}
                  borderRadius={"lg"}
                  overflow="hidden"
                  bg="gray.300"
                >
                  {eventLoading ? (
                    <Skeleton h="100%" w="100%"></Skeleton>
                  ) : (
                    <iframe
                      title={selectedEvent && selectedEvent.title}
                      src={selectedEvent && selectedEvent.videoUrl}
                      allowFullScreen
                    />
                  )}
                </AspectRatio>

                <Box py={{ base: "2", md: "4" }} px="2">
                  {eventLoading ? (
                    <VStack>
                      <Skeleton h="40px" w="100%"></Skeleton>
                    </VStack>
                  ) : (
                    <Heading as="h1" fontSize={{ base: "lg", md: "xl" }}>
                      {selectedEvent && selectedEvent.title}
                    </Heading>
                  )}
                </Box>
              </Box>

              <Box
                bg={"white"}
                borderRadius={"lg"}
                boxShadow="sm"
                p={{ base: "1", md: "2" }}
                mt={{ base: "2", lg: "2" }}
              >
                <HStack>
                  {eventLoading ? (
                    <>
                      <Skeleton h="40px" w="20%"></Skeleton>
                      <Skeleton h="40px" w="20%"></Skeleton>
                      <Skeleton h="40px" w="20%"></Skeleton>
                    </>
                  ) : (
                    selectedEvent &&
                    selectedEvent.categories.map((cat) => (
                      <Badge key={cat._id} bg={"teal.200"} p="1">
                        {cat.name}
                      </Badge>
                    ))
                  )}
                </HStack>
                <Box my={{ base: "1", md: "2" }}>
                  {eventLoading ? (
                    <VStack>
                      <Skeleton h="10" w="100%"></Skeleton>
                      <Skeleton h="10" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                      <Skeleton h="5" w="100%"></Skeleton>
                    </VStack>
                  ) : (
                    <Text fontSize="md" p="2">
                      <span
                        dangerouslySetInnerHTML={createMarkup(
                          selectedEvent && selectedEvent.content
                        )}
                      />
                    </Text>
                  )}
                </Box>
                <Divider />
                <Box p="1" borderRadius={"lg"} mt="5">
                  <Box
                    display="flex"
                    color="blackAlpha.600"
                    alignItems={"center"}
                  >
                    {eventLoading ? (
                      <VStack>
                        <Skeleton h="5" w="300px"></Skeleton>
                      </VStack>
                    ) : (
                      <>
                        <Text fontSize={"20px"}>
                          <CgUser />
                        </Text>
                        <Text fontSize={"14px"} fontWeight="600">
                          &nbsp; Speaker: &nbsp;
                          {selectedEvent && selectedEvent.guestSpeaker}
                        </Text>
                      </>
                    )}
                  </Box>
                  <Box
                    mt="1"
                    display="flex"
                    color="blackAlpha.600"
                    alignItems={"center"}
                  >
                    {eventLoading ? (
                      <VStack>
                        <Skeleton h="5" w="300px"></Skeleton>
                      </VStack>
                    ) : (
                      <>
                        <Text fontSize={"20px"}>
                          <CgCalendarDates />
                        </Text>
                        <Text fontSize={"14px"} fontWeight="400">
                          &nbsp;{" "}
                          {moment(
                            selectedEvent && selectedEvent.createdDate
                          ).format("MMMM Do, YYYY")}
                        </Text>
                      </>
                    )}
                  </Box>
                </Box>
                {eventLoading ? (
                  <Skeleton h="10" w="50%" borderRadius={"full"}></Skeleton>
                ) : (
                  <Tag size="lg" bg="teal.200" borderRadius="lg" mt="2">
                    <Avatar
                      src={selectedEvent && selectedEvent.createdBy.avatar.url}
                      size="xs"
                      name={selectedEvent && selectedEvent.createdBy.name}
                      ml={-1}
                      mr={2}
                    />
                    <TagLabel fontSize="sm">
                      <b>Posted By:</b>{" "}
                      {selectedEvent && selectedEvent.createdBy.name}
                    </TagLabel>
                  </Tag>
                )}
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: "6", md: "6", lg: "2" }}>
            <Box
              h="100%"
              bg="white"
              borderRadius={"lg"}
              boxShadow="sm"
              p={3}
              pt="1"
              mt={{ base: "5", lg: "0" }}
            >
              <Center p="2" mt="2">
                <Heading as="h2" fontSize={"xl"}>
                  Related Sessions
                </Heading>
              </Center>
              {events &&
                events.map((eve) => (
                  <Flex
                    bg="orange.100"
                    p="1"
                    borderRadius={"md"}
                    mt="2"
                    key={eve._id}
                  >
                    <NavLink to={`/events/${eve._id}`}>
                      <Avatar borderRadius={"md"} src={eve.poster.url} />
                    </NavLink>
                    <Box ml="3">
                      <NavLink to={`/events/${eve._id}`}>
                        <Text
                          fontWeight="semibold"
                          fontSize={"sm"}
                          noOfLines="1"
                        >
                          {eve.title}
                        </Text>
                      </NavLink>
                      <Text fontSize="12px">By {eve.guestSpeaker}</Text>
                    </Box>
                  </Flex>
                ))}
            </Box>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};

export default EventDetails;
