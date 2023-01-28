import { PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  MdBadge,
  MdCorporateFare,
  MdMail,
  MdPerson,
  MdPhone,
  MdTag,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AngnaLogo from "../../Assets/Images/AngnaLogo.svg";
import {
  clearMeetErrors,
  clearMeetSuccess,
  registerMeetAlumni,
} from "../../Redux/Actions/MeetAction";

const AlumniRegister = () => {
  const Dispatch = useDispatch();
  const toast = useToast();
  const { meetLoading, registered, error, success } = useSelector(
    (state) => state.Meet
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [session, setSession] = useState("");
  const [batch, setbatch] = useState("");
  const [designation, setDesignation] = useState("");
  const [year, setYear] = useState(moment(Date.now()).format("Y"));

  const registeredHandle = () => {
    Dispatch(
      registerMeetAlumni({
        name,
        email,
        phone,
        session,
        batch,
        designation,
        year,
      })
    );
  };

  const printTotalBatch = () => {
    let batches = [];
    const totalBatch = moment(Date.now()).format("Y") - 2005;

    for (let i = 1; i <= totalBatch; i++) {
      batches.push(moment.localeData().ordinal(i));
    }
    return batches;
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
      Dispatch(clearMeetErrors());
    }
    if (success) {
      setName("");
      setEmail("");
      setphone("");
      setDesignation("");
      setSession("");
      toast({
        title: "Success",
        description: success,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      Dispatch(clearMeetSuccess());
    }
  }, [error, success, Dispatch, toast]);

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      h="100vh"
      bg="blue.200"
    >
      <Helmet>
        <title>Registration Desk | Angna </title>
      </Helmet>
      <Container
        maxW="md"
        mx="2"
        boxShadow={"lg"}
        p="0"
        bg="white"
        borderRadius="md"
      >
        <Box bg="blue.700" p="2" textAlign={"center"} borderTopRadius="md">
          <Center marginTop={"-25px"}>
            <Image
              src={AngnaLogo}
              width="120px"
              borderRadius={"sm"}
              bg="white"
              p="2"
              py="1"
            />
          </Center>
          <Heading size="lg" color={"white"} mt="5">
            REGISTRATION DESK
          </Heading>
          <Text fontSize={"lg"} color="whiteAlpha.800">
            Alumni Meet - {year}
          </Text>
        </Box>

        <Box display={"flex"} justifyContent={"center"} p="5">
          <Stack spacing={4} w="95%">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<MdPerson />}
              />
              <Input
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<MdMail />}
              />
              <Input
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={"number"}
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<MdBadge />}
              />
              <Input
                placeholder="Enter Session"
                value={session}
                onChange={(e) => setSession(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Select
                placeholder="Select Batch"
                value={batch}
                onChange={(e) => setbatch(e.target.value)}
              >
                {printTotalBatch().map((b) => (
                  <option>{b}</option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<MdCorporateFare />}
              />
              <Input
                placeholder="Enter Designation/Profession"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </InputGroup>
            <Button
              isLoading={meetLoading ? true : false}
              loadingText={"REGISTERING"}
              onClick={registeredHandle}
              colorScheme={"whatsapp"}
              mt="5"
              mb="5"
            >
              REGISTER
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AlumniRegister;
