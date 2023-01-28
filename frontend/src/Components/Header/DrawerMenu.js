import React from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  Box,
  Center,
} from "@chakra-ui/react";

import {
  MdOutlineEvent,
  MdHomeFilled,
  MdLogout,
  MdContactSupport,
  MdInfo,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import LogoutUi from "../Authentication/LogoutUi";
import { FaCog, FaRegNewspaper } from "react-icons/fa";
import PaymentModal from "../Payment/PaymentModal";
import { useSelector } from "react-redux";

const DrawerMenu = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user } = useSelector((state) => state.User);

  const btnRef = React.useRef();

  const drawerList = [
    {
      page: "Home",
      route: "/",
      icon: <MdHomeFilled />,
    },
    {
      page: "Contests",
      route: "/contests",
      icon: <MdOutlineEvent />,
    },
    {
      page: "Updates",
      route: "/updates",
      icon: <FaRegNewspaper />,
    },
    {
      page: "Events",
      route: "/events",
      icon: <MdOutlineEvent />,
    },

    {
      page: "Contacts",
      route: "/contact",
      icon: <MdContactSupport />,
    },
    {
      page: "About Us",
      route: "/about",
      icon: <MdInfo />,
    },
  ];

  return (
    <>
      <span ref={btnRef} onClick={onOpen}>
        {props.children}
      </span>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody p="1">
            <Box mt="5" p="2">
              {drawerList.map((page) => (
                <NavLink key={page.page} to={page.route}>
                  <Box
                    onClick={onClose}
                    mt="1"
                    p="2"
                    borderRadius={"md"}
                    display="flex"
                    alignItems={"center"}
                  >
                    <Text fontSize={"2xl"} fontWeight="600" p="2">
                      {page.icon}
                    </Text>
                    <Text fontSize={"lg"} fontWeight="500" ml="4">
                      {page.page}
                    </Text>
                  </Box>
                </NavLink>
              ))}

              {user && user.role === "mods" ? (
                <NavLink to="/mods">
                  <Box
                    onClick={onClose}
                    mt="1"
                    p="2"
                    borderRadius={"md"}
                    display="flex"
                    alignItems={"center"}
                  >
                    <Text fontSize={"2xl"} fontWeight="600" p="2">
                      {<FaCog />}
                    </Text>
                    <Text fontSize={"lg"} fontWeight="500" ml="4">
                      Moderator Panel
                    </Text>
                  </Box>
                </NavLink>
              ) : null}
            </Box>

            <PaymentModal style={{ width: "100%" }}>
              <Center w="100%">
                <Button size="md" mt="5" w="80%" colorScheme={"orange"}>
                  Donate
                </Button>
              </Center>
            </PaymentModal>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <LogoutUi>
              <Button
                onClick={onClose}
                variant={"outline"}
                colorScheme="red"
                loadingText="Loading"
                spinnerPlacement="start"
              >
                <MdLogout size="20px" />
                &nbsp;Logout
              </Button>
            </LogoutUi>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
