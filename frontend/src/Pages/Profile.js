import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  MdArrowBack,
  MdBuild,
  MdCheck,
  MdEdit,
  MdEmail,
  MdEmojiEvents,
  MdInfo,
  MdPhone,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import AboutTab from "../Components/Profile/AboutTab";
import AvatarUpdate from "../Components/Profile/AvatarUpdate";
import ParticipationTab from "../Components/Profile/ParticipationTab";
import UpdateProfileTab from "../Components/Profile/UpdateProfileTab";
import profileDefault from "../Assets/Images/profile_default.png";
import LoginDrawer from "../Components/Authentication/LoginDrawer";
import { clearSuccess } from "../Redux/Actions/UserActions";
import { Helmet } from "react-helmet";

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();
  const { onClose } = useDisclosure();
  const Dispatch = useDispatch();

  const { user, isAuthenticated, success } = useSelector((state) => state.User);
  const profileTabs = [
    {
      _id: "1",
      name: "About Me",
      tabLink: "about",
      icon: <MdInfo />,
      tab: <AboutTab user={user && user} />,
      for: "all",
    },
    {
      _id: "2",
      name: "My Participation",
      tabLink: "Participation",
      icon: <MdEmojiEvents />,
      tab: <ParticipationTab />,
      for: "student",
    },
    {
      _id: "3",
      name: "Update Profile",
      tabLink: "Update",
      icon: <MdBuild />,
      tab: <UpdateProfileTab />,
      for: "all",
    },
  ];

  const [isSelected, setIsSelected] = useState(params.tab ? true : false);

  const [selectedTabLink, setSelectedTabLink] = useState(
    params.tab ? params.tab : null
  );

  const [selectedTab, setSelectedTab] = useState(
    profileTabs.map((tab) => (
      <span key={tab._id}>{tab.tabLink === params.tab ? tab.tab : null}</span>
    ))
  );

  const [selectedTabTitle, setSelectedTabTitle] = useState(
    profileTabs.map((tab) => (
      <span key={tab._id}>{tab.tabLink === params.tab ? tab.name : null}</span>
    ))
  );
  useEffect(() => {
    if (!success) {
      return;
    }
    toast({
      title: "Success",
      description: success.message,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    onClose();
    Dispatch(clearSuccess());
  }, [success, toast, onClose, Dispatch]);

  return (
    <Box>
      <Helmet>
        <title> {user.name ? user.name : "+" + user.phone} | Angna</title>
        <meta name="description" content="Hey I am an user of ANGNA." />
        <link rel="canonical" href={window.location.origin + "/profile"} />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content="angna, jnv angna, association of garhwa navodaya alumni, jnv garhwa, live councelling, live contest, live session, jawahar navodaya vidyalaya, nvs, jnv"
        />

        <meta
          property="og:title"
          content="Profile | Association of Garhwa Navodaya Alumni"
        />
        <meta property="og:description" content="Hey" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/profile"} />
        <meta
          property="og:image"
          content={user && user.avatar && user.avatar.url}
        />
      </Helmet>
      {!isAuthenticated ? (
        <Center display={"flex"} flexDirection={"column"}>
          <Image
            src={profileDefault}
            w={{ base: "300px", md: "350px", lg: "450px" }}
            borderRadius={"lg"}
          />
          <Heading size="md">Please login to access this page.</Heading>
          <LoginDrawer>Login</LoginDrawer>
        </Center>
      ) : (
        <Box py="5">
          <Container maxW="6xl">
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
              gap={6}
            >
              <GridItem
                display={
                  isSelected ? { base: "none", lg: "block" } : { base: "block" }
                }
              >
                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  bg="white"
                  borderRadius={"lg"}
                  p="1"
                >
                  <Box
                    bg="gray.300"
                    w="100%"
                    h="150px"
                    borderRadius={"lg"}
                    bgImage={
                      "https://images.unsplash.com/photo-1614850715649-1d0106293bd1"
                    }
                    bgSize="cover"
                    bgPosition="center"
                  >
                    <Button
                      m="2"
                      p="1"
                      bg="whiteAlpha.600"
                      onClick={() => navigate(-1)}
                    >
                      <MdArrowBack />
                    </Button>
                  </Box>
                  <Avatar
                    size={"2xl"}
                    mt="-60px"
                    name={user && user.name && user.name}
                    src={user && user.avatar && user.avatar.url}
                  >
                    <AvatarUpdate>
                      <AvatarBadge
                        p="1"
                        bg="orange.400"
                        boxSize="30px"
                        border={"none"}
                        borderRadius={"lg"}
                        m="3"
                        _hover={{ bg: "orange.500" }}
                      >
                        <MdEdit color="white" />
                      </AvatarBadge>
                    </AvatarUpdate>
                  </Avatar>

                  <Box mt="5">
                    <Center flexDirection={"column"}>
                      <HStack>
                        <Heading as={"h1"} size="lg">
                          {user.name ? user.name : "+" + user.phone}
                        </Heading>
                      </HStack>

                      <HStack>
                        <Badge fontSize={"lg"} bg="orange" px="10">
                          {user.iAm ? user.iAm.iAm_type : "Update profile"}
                        </Badge>
                      </HStack>
                    </Center>
                  </Box>

                  <Box mt="5" display={"flex"} w="100%" gap={"1"}>
                    <Box flexGrow={1}>
                      <InputGroup bg="white" borderRadius={"lg"} boxShadow="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                          children={<MdPhone />}
                        />
                        <Input
                          value={user.phone ? "+" + user.phone : "Phone Number"}
                          fontSize={"sm"}
                          readOnly
                          border="none"
                          _focus={{ border: "none" }}
                        />
                        <InputRightElement children={<MdCheck />} />
                      </InputGroup>
                    </Box>
                    <Box flexGrow={1}>
                      <InputGroup borderRadius={"lg"} boxShadow="lg">
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                          children={<MdEmail />}
                        />
                        <Input
                          fontSize={"sm"}
                          value={user.email ? user.email : "Email"}
                          readOnly
                          border="none"
                          _focus={{ border: "none" }}
                        />
                        <InputRightElement children={<MdCheck />} />
                      </InputGroup>
                    </Box>
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  bg="white"
                  borderRadius={"lg"}
                  p="1"
                  mt="5"
                  gap="1"
                >
                  {profileTabs.map((tab) => (
                    <NavLink
                      key={tab._id}
                      to={`/profile/${tab.tabLink}`}
                      style={{ width: "100%", color: "black" }}
                    >
                      <Button
                        leftIcon={tab.icon}
                        w="100%"
                        justifyContent={"left"}
                        gap="3"
                        size="lg"
                        variant="solid"
                        bg={
                          selectedTabLink === tab.tabLink ? "gray.200" : "white"
                        }
                        onClick={() => {
                          setIsSelected(true);
                          setSelectedTabLink(tab.tabLink);
                          setSelectedTab(tab.tab);
                          setSelectedTabTitle(tab.name);
                        }}
                      >
                        {tab.name}
                      </Button>
                    </NavLink>
                  ))}
                </Box>
              </GridItem>
              <GridItem
                display={
                  isSelected ? { base: "block" } : { base: "none", lg: "block" }
                }
              >
                <Box
                  h="100%"
                  display={"flex"}
                  flexDirection="column"
                  alignItems="center"
                  bg="white"
                  borderRadius={"lg"}
                  p="1"
                >
                  <Box
                    display="flex"
                    justifyContent={"flex-start"}
                    alignItems="center"
                    w="100%"
                    bg="blackAlpha.300"
                    borderRadius={"lg"}
                    p="3"
                  >
                    <Show below={"lg"}>
                      <Button
                        p="1"
                        onClick={() => {
                          setIsSelected(false);
                          setSelectedTab(null);
                          setSelectedTabLink(null);
                          setSelectedTabTitle(null);
                          navigate(-1);
                        }}
                      >
                        <MdArrowBack />
                      </Button>
                    </Show>

                    <Text fontSize="20px" fontWeight={"medium"} ml="5 ">
                      {selectedTabTitle}
                    </Text>
                  </Box>
                  <Box w="100%" h="100%">
                    {selectedTab}
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
