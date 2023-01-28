import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdCheckBox, MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../../Redux/Actions/PaymentAction";
import donationImage from "../../Assets/Images/donation.jpeg";
const PaymentModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const Dispatch = useDispatch();

  const { paymentLoading, paymentStatus } = useSelector(
    (state) => state.Payment
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1);

  const errorToast = (msz) => {
    toast({
      title: "Error",
      description: msz,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };
  const handleCheckout = () => {
    if (name.length < 4) {
      errorToast("Please enter valid name.");
      return;
    }

    if (email.length < 5) {
      errorToast("Please enter valid email.");
      return;
    }

    if (phone.length < 10) {
      errorToast("Please enter valid phone number.");
      return;
    }

    if (amount < 1) {
      errorToast("Minimum donation amount is Rs 1.");
      return;
    }

    const donatorData = {
      name,
      email,
      phone,
      amount,
      description: "Donation",
    };
    Dispatch(makePayment(donatorData));
  };

  return (
    <>
      <span onClick={onOpen}>{props.children}</span>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "sm" }}
      >
        <ModalOverlay />
        <ModalContent borderRadius={"0"}>
          <ModalCloseButton />
          {paymentStatus === "initial" ? (
            <Box p="5" my="10">
              <Center flexDir={"column"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  h={"100px"}
                  w={"100px"}
                />
                <Text
                  fontSize={"2xl"}
                  fontWeight="bold"
                  mt="5"
                  color={"blue.300"}
                >
                  Processing...
                </Text>
              </Center>
            </Box>
          ) : paymentStatus === "verify" ? (
            <Box p="5" my="10">
              <Center flexDir={"column"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="green.500"
                  h={"100px"}
                  w={"100px"}
                />
                <Text
                  fontSize={"2xl"}
                  fontWeight="bold"
                  mt="5"
                  color={"green.300"}
                >
                  Verifying...
                </Text>
              </Center>
            </Box>
          ) : paymentStatus === "success" ? (
            <Box p="5" my="10">
              <Center flexDir={"column"}>
                <Text color="green.500">
                  <MdCheckBox size="100px" />
                </Text>
                <Text
                  fontSize={"2xl"}
                  fontWeight="bold"
                  mt="5"
                  color={"green.500"}
                >
                  Thank You!
                </Text>
                <Text fontSize={"lg"} color={"green.500"} mt="2">
                  Your Donation was Successfull.
                </Text>
              </Center>
            </Box>
          ) : (
            <Box>
              <Center spacing="0">
                <Image boxSize={150} src={donationImage} />
              </Center>

              <ModalBody mb="4">
                <Heading as={"h2"} size="md">
                  Giving is the greatest act of Grace
                </Heading>
                <Text fontSize={"sm"} color="blackAlpha.700" mt="1" mb="3">
                  Enter your details to donate.
                </Text>

                <Stack spacing={3} mt="5">
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<MdPerson fontSize={"21px"} />}
                    />
                    <Input
                      type="text"
                      placeholder="Enter Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.300" />}
                    />
                    <Input
                      type="tel"
                      placeholder="Enter Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EmailIcon color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={"₹"}
                    />
                    <Input
                      type="number"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </InputGroup>
                </Stack>
                <Center>
                  <Text fontSize="10px" mt="5" align={"center"}>
                    By continuning, you agree Angna's <b>Term & Condition</b> &
                    <b> Privacy Policy</b>.
                  </Text>
                </Center>
              </ModalBody>
              <Button
                w="100%"
                position={{ base: "fixed", md: "relative" }}
                bottom={0}
                isLoading={paymentLoading ? true : false}
                colorScheme={"orange"}
                borderRadius="none"
                size={"lg"}
                onClick={() => {
                  handleCheckout();
                }}
              >
                Donate Now
              </Button>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
