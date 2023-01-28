import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import angnaLogo from "../../Assets/Images/AngnaLogo.svg";
import OtpInputUi from "./OtpInputUi";
import PhoneInputUi from "./PhoneInputUi";

const LoginDrawer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { loginStep } = useSelector((state) => state.User);

  return (
    <>
      <span ref={btnRef} onClick={onOpen}>
        {props.children}
      </span>
      <Drawer
        isOpen={props.loginToAccess ? onOpen : isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <Center>
            <Box bg="white" p="3" borderRadius={"md"} zIndex={1} mb="-30px">
              <Image src={angnaLogo} h="6"></Image>
            </Box>
          </Center>
          <Box bg="white" borderTopRadius={"xl"}>
            <DrawerBody mt="10">
              {loginStep.step === "PhoneInput" && <PhoneInputUi />}
              {loginStep.step === "OtpInput" && <OtpInputUi />}
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
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LoginDrawer;
