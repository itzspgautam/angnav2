import {
  Box,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleParticipation } from "../../Redux/Actions/ParticipateAction";

import moment from "moment";

import successGif from "../../Assets/Images/participation_success.gif";
import { MdFileCopy, MdPictureAsPdf } from "react-icons/md";
import { Helmet } from "react-helmet";
export const ParticipationDetails = (props) => {
  const Dispatch = useDispatch();

  const participation_id = props.participationId;

  const { currentParticipation } = useSelector((state) => state.Participation);

  useEffect(() => {
    Dispatch(getSingleParticipation(participation_id));
  }, [Dispatch, participation_id]);

  return (
    <>
      <Helmet>
        <title>Participation Details | Angna </title>
      </Helmet>
      <Box py={{ base: "2", md: "4" }}>
        <Container maxW="6xl" px="2">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg:
                currentParticipation &&
                currentParticipation.contest.file_type !== "na"
                  ? "repeat(2, 1fr)"
                  : "repeat(1, 1fr)",
            }}
            gap={2}
          >
            <GridItem
              display={"flex"}
              flexDirection={{ base: "column-reverse", lg: "column" }}
            >
              <Box bg="white" borderRadius={"lg"} boxShadow="sm" p={3} h="100%">
                <Heading
                  as={"h1"}
                  color="blue.400"
                  size={{ base: "md" }}
                  textAlign="center"
                >
                  <div>
                    Congrats{" "}
                    {currentParticipation &&
                      currentParticipation.uploaded_data.name.split(
                        " "
                      )[0]}{" "}
                    !
                  </div>
                  You have been participated.
                </Heading>
                <Center flexDir={"column"}>
                  <Image src={successGif} w="70%" />
                  <Heading as={"h3"} size={{ base: "md", md: "lg" }}>
                    {currentParticipation && currentParticipation.contest.title}
                  </Heading>
                  <Divider orientation="horizontal" my="2" />
                  <Text fontSize={{ base: "sm", md: "md" }} p="2" mt="1">
                    <b>Submitted On:</b>{" "}
                    {moment(
                      currentParticipation &&
                        currentParticipation.submission_time
                    ).format("MMMM Do YYYY, ha")}
                  </Text>
                </Center>
              </Box>
            </GridItem>
            {currentParticipation &&
            currentParticipation.contest.file_type !== "na" ? (
              <GridItem
                w="100%"
                display={"flex"}
                flexDirection={{ base: "column-reverse", lg: "column" }}
              >
                <Box
                  bg="white"
                  borderRadius={"lg"}
                  boxShadow="sm"
                  p={3}
                  h="100%"
                >
                  <Box display={"flex"} gap="2" flexDirection={"column"}>
                    <Heading size={"lg"} as={"h3"} textAlign="center">
                      Uploaded File
                    </Heading>

                    <Box>
                      {currentParticipation &&
                      currentParticipation.contest.file_type === "Image" ? (
                        <Center
                          borderRadius={"lg"}
                          overflow="hidden"
                          mt="4"
                          bg="#CBD5E0"
                        >
                          <Image
                            src={
                              currentParticipation &&
                              currentParticipation.uploaded_data.file.url
                            }
                            borderRadius={"lg"}
                          />
                        </Center>
                      ) : currentParticipation &&
                        currentParticipation.contest.file_type ===
                          "Video/Audio" ? (
                        <Center borderRadius={"lg"} overflow="hidden" mt="4">
                          <video loop autoPlay controls>
                            <source
                              src={
                                currentParticipation &&
                                currentParticipation.uploaded_data.file.url
                              }
                              type="video/mp4"
                            />
                          </video>
                        </Center>
                      ) : currentParticipation &&
                        currentParticipation.contest.file_type === "PDF" ? (
                        <Center borderRadius={"lg"} overflow="hidden" mt="4">
                          <a
                            href={
                              currentParticipation &&
                              currentParticipation.uploaded_data.file.url
                            }
                          >
                            <MdPictureAsPdf fontSize={"100px"} />
                          </a>
                          <Heading as={"h4"} fontSize={"lg"}>
                            View PDF
                          </Heading>
                        </Center>
                      ) : currentParticipation &&
                        currentParticipation.contest.file_type ===
                          "Document" ? (
                        <Center borderRadius={"lg"} overflow="hidden" mt="4">
                          <a
                            href={
                              currentParticipation &&
                              currentParticipation.uploaded_data.file.url
                            }
                          >
                            <MdFileCopy fontSize={"100px"} />
                          </a>
                          <Heading as={"h4"} fontSize={"lg"}>
                            View Document
                          </Heading>
                        </Center>
                      ) : null}
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
