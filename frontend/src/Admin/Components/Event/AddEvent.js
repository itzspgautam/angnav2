import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { CgCalendarDates, CgUser } from "react-icons/cg";
import { FaPlus, FaTimes, FaUpload, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEventErrors,
  clearEventSuccess,
  createNewEvent,
} from "../../../Redux/Actions/EventAction";
import Rte from "../../Utils/Rte";
import { CategoryDrawer } from "../Drawer/CategoryDrawer";

const AddEvent = () => {
  const selectPoster = useRef();
  const Dispatch = useDispatch();
  const toast = useToast();

  const { eventLoading, categories, error, success } = useSelector(
    (state) => state.Event
  );

  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [speakerDes, setSpeakerDes] = useState("");
  const [des, setDes] = useState("");
  const [date, setDate] = useState(Date.now());
  const [videoUrl, setVideoUrl] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterPrev, setPosterPrev] = useState(null);
  const [content, setContent] = useState("");
  const [selectedCat, setSelected] = useState([]);
  const [selectedCatId, setSelectedId] = useState([]);

  function createMarkup(theExactHtmlWithTag) {
    return { __html: theExactHtmlWithTag };
  }

  const selectCategoryHandle = (e) => {
    const SelcatName = e.target.value.split("~")[0];
    const SelCatId = e.target.value.split("~")[1];

    const isFound = selectedCat.some((element) => {
      if (element.id === SelCatId) {
        return true;
      }
    });

    if (!isFound) {
      setSelected([...selectedCat, { id: SelCatId, cat: SelcatName }]);
      setSelectedId([...selectedCatId, SelCatId]);
    }
  };

  const removeCategoryHandle = (SelCatId) => {
    setSelected(selectedCat.filter((item) => item.id !== SelCatId));
    setSelectedId(selectedCatId.filter((item) => item !== SelCatId));
  };

  const selectPosterHandle = (e) => {
    const addedFile = e.target.files[0];
    setPosterPrev(URL.createObjectURL(addedFile));
    setPoster(addedFile);
  };

  const submitEventHandle = () => {
    const eventData = {
      title,
      description: des,
      guestSpeaker: speaker,
      guestSpeakerDes: speakerDes,
      categories: selectedCatId,
      videoUrl: videoUrl,
      content,
    };
    console.log(eventData, poster);

    Dispatch(createNewEvent(poster, eventData));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      Dispatch(clearEventErrors());
    }
    if (success) {
      setTitle("");
      setContent("");
      setPoster(null);
      setDes("");
      setSelected([]);
      setPosterPrev(null);
      setVideoUrl("");
      setSelectedId([]);
      setSpeaker("");
      setSpeakerDes("");

      toast({
        title: "Success",
        description: success,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      Dispatch(clearEventSuccess());
    }
  }, [error, success, Dispatch, toast]);

  return (
    <>
      <Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem w="100%">
            <Center
              bg="white"
              p="5"
              borderRadius={"lg"}
              justifyContent={"space-between"}
              _hover={{ boxShadow: "sm" }}
            >
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="T"
                  />
                  <Input
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="T"
                  />
                  <Input
                    placeholder="Guest Speaker name"
                    value={speaker}
                    onChange={(e) => setSpeaker(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="T"
                  />
                  <Input
                    placeholder="Guest Speaker Designation"
                    value={speakerDes}
                    onChange={(e) => setSpeakerDes(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="T"
                  />
                  <Input
                    placeholder="Short Description"
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children={<FaYoutube />}
                  />
                  <Input
                    placeholder="Video Url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </InputGroup>

                <HStack alignItems={"start"}>
                  <Box flex="1">
                    <InputGroup>
                      <Select onChange={selectCategoryHandle}>
                        <option value="">Select Category</option>
                        {categories &&
                          categories.map((cat) => (
                            <option
                              key={cat._id}
                              value={cat.name + "~" + cat._id}
                            >
                              {cat.name}
                            </option>
                          ))}
                      </Select>
                    </InputGroup>
                    <Button
                      w="100%"
                      mt="5"
                      h="150px"
                      flexDirection={"column"}
                      gap="2"
                      onClick={() => selectPoster.current.click()}
                    >
                      <FaUpload size="50px" />
                      Upload Poster
                    </Button>
                    <Input
                      type={"file"}
                      ref={selectPoster}
                      onChange={selectPosterHandle}
                      display="none"
                    />
                  </Box>
                  <Box flex={1}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                      {selectedCat.map((cat) => (
                        <GridItem key={cat.id}>
                          <Button
                            justifyContent={"space-between"}
                            w="100%"
                            size="sm"
                            bg="teal.300"
                            borderRadius={"sm"}
                            rightIcon={
                              <FaTimes
                                onClick={() => removeCategoryHandle(cat.id)}
                                style={{
                                  background: "white",
                                  color: "red",
                                  padding: "2px",
                                  borderRadius: "4px",
                                  fontSize: "18px",
                                  height: "100%",
                                }}
                              />
                            }
                          >
                            {cat.cat}
                          </Button>
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>
                </HStack>
                <Rte setContent={setContent} content={content} />
                <Button
                  isLoading={eventLoading ? true : false}
                  colorScheme={"whatsapp"}
                  onClick={submitEventHandle}
                >
                  Submit
                </Button>
              </Stack>
            </Center>
          </GridItem>
          <GridItem w="100%">
            <Center
              bg="white"
              p="2"
              borderRadius={"lg"}
              justifyContent={"start"}
              flexDirection="column"
              _hover={{ boxShadow: "sm" }}
              h="100%"
            >
              <HStack alignItems={"start"} w="100%">
                <Box
                  bg="blackAlpha.100"
                  borderRadius={"lg"}
                  boxSize={"150px"}
                  overflow="hidden"
                >
                  <Image src={posterPrev} objectFit="cover" />
                </Box>
                <VStack
                  alignItems={"start"}
                  h="150px"
                  p="1"
                  justifyContent={"space-between"}
                >
                  <Heading as={"h2"} fontSize="17px">
                    {title ? title : "Title Event"}
                  </Heading>
                  <VStack alignItems={"start"} spacing="0.5">
                    <Box
                      display="flex"
                      color="blackAlpha.600"
                      alignItems={"center"}
                    >
                      <Text fontSize={"20px"}>
                        <CgUser />
                      </Text>
                      <Text fontSize={"14px"} fontWeight="500">
                        <b>Speaker</b> : &nbsp;{" "}
                        {speaker ? speaker : "Guest Speaker Name"}
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      color="blackAlpha.600"
                      alignItems={"center"}
                    >
                      <Text fontSize={"20px"}>
                        <CgCalendarDates />
                      </Text>
                      <Text fontSize={"14px"} fontWeight="500">
                        <b>Date</b> : &nbsp;{" "}
                        {moment(date).format("MMMM Do, 2022")}
                      </Text>
                    </Box>
                  </VStack>

                  <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                    {selectedCat.map((cat) => (
                      <GridItem key={cat.id}>
                        <Button
                          justifyContent={"space-between"}
                          w="100%"
                          size="sm"
                          bg="teal.300"
                          borderRadius={"sm"}
                        >
                          {cat.cat}
                        </Button>
                      </GridItem>
                    ))}
                  </Grid>
                </VStack>
              </HStack>
              <VStack alignItems={"start"} mt="2" w="100%">
                <Text
                  borderRadius={"lg"}
                  fontWeight={"medium"}
                  fontSize="sm"
                  p="2"
                  py="4"
                  bg="blackAlpha.100"
                  w="100%"
                >
                  {des ? des : "Event Short Description"}
                </Text>
                <Box fontWeight={"normal"}>
                  <span dangerouslySetInnerHTML={createMarkup(content)} />
                </Box>
              </VStack>
            </Center>
          </GridItem>
        </Grid>
      </Box>
      <Box position={"fixed"} bottom="5" right="10">
        <CategoryDrawer>
          <Button leftIcon={<FaPlus />} size="md" bg="orange.300">
            Add Category
          </Button>
        </CategoryDrawer>
      </Box>
    </>
  );
};

export default AddEvent;
