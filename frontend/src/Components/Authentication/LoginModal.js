import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import loginBg from "../../Assets/Images/loginBg.jpg";
import angnaLogo from "../../Assets/Images/AngnaLogo.svg";

import PhoneInputUi from "./PhoneInputUi";
import OtpInputUi from "./OtpInputUi";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const LoginModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const LoginStep = useSelector((state) => state.User.loginStep);

  return (
    <>
      <span onClick={onOpen}>{props.children}</span>

      <Modal
        isOpen={props.loginToAccess ? onOpen : isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent borderRadius={"lg"} overflow="hidden" p="0">
          {props.loginToAccess ? "" : <ModalCloseButton />}
          <ModalBody p="0">
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            >
              <GridItem
                w="100%"
                bgImage={loginBg}
                bgSize={"cover"}
                bgPosition={"center"}
              ></GridItem>
              <GridItem w="100%">
                <Box px="5" py="7" flexGrow={1}>
                  <Center>
                    <Box bg="white" p="3" borderRadius={"md"} zIndex={1}>
                      <Image src={angnaLogo} h="6"></Image>
                    </Box>
                  </Center>
                  {LoginStep.step === "PhoneInput" && <PhoneInputUi />}
                  {LoginStep.step === "OtpInput" && <OtpInputUi />}
                  {props.loginToAccess ? (
                    <NavLink to="/home">
                      <Button
                        size="sm"
                        mx="2"
                        colorScheme={"red"}
                        borderRadius="sm"
                      >
                        Cancel
                      </Button>
                    </NavLink>
                  ) : (
                    ""
                  )}
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
