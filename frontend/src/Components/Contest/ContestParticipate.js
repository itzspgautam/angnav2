import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Progress,
  Select,
  Show,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MdAddAPhoto,
  MdEmail,
  MdFileCopy,
  MdPerson,
  MdPhone,
  MdPictureAsPdf,
  MdVideoLibrary,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearContestErrors,
  contestDetails,
} from "../../Redux/Actions/ContestAction";
import {
  clearParticipateErrors,
  newParticipationSubmit,
} from "../../Redux/Actions/ParticipateAction";
import { ParticipationDetails } from "./ParticipationDetails";

import uploadingGif from "../../Assets/Images/file_uploading.gif";
import ContestDetailsSkeleton from "../Skeleton/ContestDetailsSkeleton";

const uploadFilesType = [
  {
    title: "Image",
    allowed: "image/*",
    icon: <MdAddAPhoto />,
  },
  {
    title: "Video/Audio",
    allowed: "video/* ,audio/*",
    icon: <MdVideoLibrary />,
  },
  {
    title: "PDF",
    allowed: "application/pdf",
    icon: <MdPictureAsPdf />,
  },
  {
    title: "Document",
    allowed: "",
    icon: <MdFileCopy />,
  },
];
const ContestParticipate = () => {
  const selectFile = useRef();
  const params = useParams();
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { selectedContest, error } = useSelector((state) => state.Contests);
  const { newParticipation, participateError } = useSelector(
    (state) => state.Participation
  );

  const { user } = useSelector((state) => state.User);

  const [isPart, setIsPart] = useState(null);
  const [isPartLoading, setIsPartLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [isfileRequired, setIsFileRequired] = useState(true);

  const [previewFileUrl, setPreviewFileUrl] = useState(null);
  const { onClose } = useDisclosure();

  const [cGroup, setCGroup] = useState("");
  const [cClass, setCClass] = useState("");

  const [cName, setCName] = useState(user && user.name ? user.name : "");
  const [cEmail, setCEmail] = useState(user && user.email ? user.email : "");
  const [cPhone, setCPhone] = useState(user && user.phone ? user.phone : "");

  const selectFileHandle = (e) => {
    const addedFile = e.target.files[0];
    setPreviewFileUrl(URL.createObjectURL(addedFile));
    setFile(addedFile);
  };

  const checkParticipation = useCallback(async () => {
    await axios
      .get(`/api/v1/contests/${params.id}/participate`)
      .then((res) => {
        setIsPart(res.data.participation._id);
        setIsPartLoading(false);
      })
      .catch((error) => {
        setIsPart(false);
        setIsPartLoading(false);
      });
  }, [params.id]);

  const submitParticipationHandle = async () => {
    const uploadData = {
      name: cName,
      email: cEmail,
      phone: cPhone,
      group: cGroup,
      group_class: cClass,
      file_required: isfileRequired,
    };
    Dispatch(
      newParticipationSubmit(
        uploadData,
        isfileRequired ? file : null,
        params.id
      )
    );
  };

  useEffect(() => {
    setIsPartLoading(true);
    if (!newParticipation.participation) {
      setIsPartLoading(false);
      return;
    }
    setIsPart(newParticipation.participation._id);
    setIsPartLoading(false);
  }, [newParticipation]);

  useEffect(() => {
    if (!participateError) {
      return;
    }
    toast({
      title: "Error",
      description: participateError,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    Dispatch(clearParticipateErrors());
  }, [participateError, Dispatch, toast]);

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

    navigate("/contests");
  }, [error, Dispatch, toast, navigate]);

  useEffect(() => {
    if (
      selectedContest &&
      Date.parse(selectedContest.expireDate) < Date.now()
    ) {
      navigate("/contests");
    }
  }, [selectedContest]);

  useEffect(() => {
    setIsPartLoading(true);
    checkParticipation();
    if (selectedContest) {
      setIsFileRequired(selectedContest.file_type === "na" ? false : true);
      return;
    }
    Dispatch(contestDetails(params.id));
  }, [selectedContest, params.id, Dispatch, checkParticipation]);

  return (
    <>
      {isPartLoading ? (
        <Container maxW="6xl" mt="5">
          <ContestDetailsSkeleton />
        </Container>
      ) : isPart ? (
        <ParticipationDetails participationId={isPart} />
      ) : (
        <Box py={{ base: "2", md: "4" }}>
          <Container maxW="6xl" px="2">
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={2}
            >
              <GridItem
                w="100%"
                display={"flex"}
                flexDirection={{ base: "column-reverse", lg: "column" }}
              >
                <Box bg="white" borderRadius={"lg"} boxShadow="sm" p={3}>
                  <Heading as={"h1"} size={{ base: "md", md: "lg" }}>
                    {selectedContest && selectedContest.title}
                  </Heading>
                  <Divider orientation="horizontal" my="2" />
                  <Text fontSize={{ base: "sm", md: "md" }} p="2" mt="1"></Text>
                  <Text>Fill the details and upload files to participate.</Text>

                  <Stack spacing={4} mt="5">
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children={<MdPerson />}
                      />
                      <Input
                        placeholder="Enter full name"
                        value={cName}
                        onChange={(e) => setCName(e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children={<MdPhone />}
                      />
                      <Input
                        placeholder="Enter Phone Number"
                        value={cPhone}
                        onChange={(e) => setCPhone(e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children={<MdEmail />}
                      />
                      <Input
                        placeholder="Enter Email"
                        value={cEmail}
                        onChange={(e) => setCEmail(e.target.value)}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Select
                        placeholder="Select Group"
                        onChange={(e) => setCGroup(e.target.value)}
                      >
                        {selectedContest &&
                          selectedContest.group.map((group) => (
                            <option value={group.group_name} key={group._id}>
                              Group {group.group_name} (
                              {group.group_classes.map((a) => a + "th, ")})
                            </option>
                          ))}
                      </Select>
                    </InputGroup>

                    {cGroup && (
                      <InputGroup>
                        <Select
                          placeholder="Select Class"
                          onChange={(e) => setCClass(e.target.value)}
                        >
                          {selectedContest &&
                            selectedContest.group.map((group, i, arr) => (
                              <>
                                {arr[i].group_name === cGroup &&
                                  arr[i].group_classes.map((cls) => (
                                    <option value={cls}>{cls + "th"}</option>
                                  ))}
                              </>
                            ))}
                        </Select>
                      </InputGroup>
                    )}
                  </Stack>
                </Box>
                <Show above="md">
                  <Button
                    onClick={submitParticipationHandle}
                    colorScheme={"yellow"}
                    mt="5"
                    w="100%"
                    size="lg"
                  >
                    SUBMIT
                  </Button>
                </Show>
              </GridItem>
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
                  h="100%"
                >
                  <Box display={"flex"} gap="2">
                    {uploadFilesType.map((type) =>
                      selectedContest &&
                      selectedContest.file_type === type.title ? (
                        <Center
                          onClick={() => selectFile.current.click()}
                          key={type.title}
                          bg={
                            selectedContest &&
                            selectedContest.file_type === type.title
                              ? "#CBD5E0"
                              : "ghostwhite"
                          }
                          flexGrow={1}
                          p="5"
                          borderRadius={"lg"}
                          transition=".5s"
                          _hover={{ bg: "#A0AEC0" }}
                          flexDirection="column"
                        >
                          <Text fontSize={"40px"} color="blackAlpha.700">
                            {type.icon}
                          </Text>
                          <Text> Upload {type.title}</Text>

                          <Input
                            type="file"
                            accept={type.allowed}
                            ref={selectFile}
                            onChange={selectFileHandle}
                            display="none"
                          />
                        </Center>
                      ) : null
                    )}
                  </Box>
                  <Box>
                    {selectedContest &&
                    selectedContest.file_type === "Image" ? (
                      file && (
                        <Center
                          borderRadius={"lg"}
                          overflow="hidden"
                          mt="4"
                          bg="#CBD5E0"
                        >
                          <Image src={previewFileUrl} borderRadius={"lg"} />
                        </Center>
                      )
                    ) : selectedContest &&
                      selectedContest.file_type === "Video/Audio" ? (
                      file && (
                        <Center borderRadius={"lg"} overflow="hidden" mt="4">
                          <video loop autoPlay controls>
                            <source src={previewFileUrl} type="video/mp4" />
                          </video>
                        </Center>
                      )
                    ) : selectedContest &&
                      selectedContest.file_type === "PDF" ? (
                      <Center borderRadius={"lg"} overflow="hidden" mt="4">
                        <iframe
                          over
                          style={{
                            background: "#CBD5E0",
                            width: "100%",
                            height: "500px",
                            border: "2px solid #CBD5E0",
                            overflow: "hidden",
                            scrollbarWidth: "0px",
                          }}
                          title="naruto"
                          src={
                            previewFileUrl &&
                            previewFileUrl + "#toolbar=0&navpanes=0&scrollbar=0"
                          }
                          allowFullScreen
                        />
                      </Center>
                    ) : selectedContest &&
                      selectedContest.file_type === "Document" &&
                      file ? (
                      <Center
                        borderRadius={"lg"}
                        overflow="hidden"
                        mt="4"
                        p="5"
                        bg="gray.100"
                      >
                        <MdFileCopy fontSize={"60px"} />

                        <Heading as={"h4"} fontSize={"lg"}>
                          {file && file.name}
                        </Heading>
                      </Center>
                    ) : null}
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Container>
          <Show below="lg">
            <Button
              onClick={submitParticipationHandle}
              colorScheme={"yellow"}
              bottom="0"
              borderRadius={"none"}
              w="100%"
              size="lg"
              position={"fixed"}
              zIndex="1"
            >
              SUBMIT
            </Button>
          </Show>

          <>
            <Modal
              isOpen={
                newParticipation &&
                newParticipation.fileUpload &&
                newParticipation.fileUpload.uploading
                  ? true
                  : false
              }
              onClose={onClose}
            >
              <ModalOverlay bg="blackAlpha.900" />
              <ModalContent borderRadius={"lg"}>
                <ModalBody p="2">
                  <Center flexDir={"column"}>
                    <Image src={uploadingGif} w="100%" borderRadius={"lg"} />
                    <Text fontSize="2xl" fontWeight={"bold"}>
                      Uploading...
                    </Text>
                    <Text fontSize="md" fontWeight={"medium"}>
                      Don't close this window.
                    </Text>
                    <Progress mt="5" size="xs" isIndeterminate w="100%" />
                  </Center>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        </Box>
      )}
    </>
  );
};

export default ContestParticipate;
