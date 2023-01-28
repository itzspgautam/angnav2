import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdLogout, MdPerson } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import angnaLogo from "../../Assets/Images/AngnaLogo.svg";
import LoginDrawer from "../Authentication/LoginDrawer";
import LoginModal from "../Authentication/LoginModal";
import LogoutUi from "../Authentication/LogoutUi";
import PaymentModal from "../Payment/PaymentModal";
import DrawerMenu from "./DrawerMenu";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.User);
  return (
    <>
      <Box
        p={4}
        px={{ base: "3", md: "20px", lg: "150px" }}
        boxShadow="md"
        bg="white"
        // position={"fixed"}
        // zIndex="1000"
        // w="100%"
      >
        <Show above="md">
          <Flex alignItems={"center"}>
            <Box flexGrow="1">
              <Image
                src={angnaLogo}
                height="10"
                title="Angna Logo"
                alt="Angna Logo"
                loading="lazy"
              />
            </Box>

            <Box flexGrow="4">
              <Flex gridGap="8" justifyContent={"center"}>
                <NavLink
                  end
                  to="/"
                  fontFamily={"poppins"}
                  fontWeight="400"
                  fontSize={"15"}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/updates"
                  fontFamily={"poppins"}
                  fontWeight="400"
                  fontSize={"15"}
                >
                  Updates
                </NavLink>
                <NavLink
                  to="/contests"
                  fontFamily={"poppins"}
                  fontWeight="400"
                  fontSize={"15"}
                >
                  Contests
                </NavLink>

                <NavLink
                  to="/events"
                  fontFamily={"poppins"}
                  fontWeight="400"
                  fontSize={"15"}
                >
                  Events
                </NavLink>

                <NavLink
                  to="/contact"
                  fontFamily={"poppins"}
                  fontWeight="400"
                  fontSize={"15"}
                >
                  Contacts
                </NavLink>
              </Flex>
            </Box>
            <Box flexGrow="1" alignItems={"center"}>
              <Flex gridGap={2} alignItems="center" justifyContent={"flex-end"}>
                <PaymentModal>
                  <Button
                    size="sm"
                    borderRadius={5}
                    colorScheme="gray"
                    _hover={{ bg: "orange" }}
                  >
                    Donate
                  </Button>
                </PaymentModal>

                {isAuthenticated ? (
                  <Menu>
                    <MenuButton>
                      <Avatar
                        name={user && user.name}
                        src={user && user.avatar ? user.avatar.url : ""}
                        boxSize={"10"}
                      />
                    </MenuButton>
                    <MenuList p="0" overflow={"hidden"} width="300px">
                      <Box p="3" bg="teal.500" mb="4">
                        <Text size="sm" color="white">
                          Hello, {user && user.name}
                        </Text>
                      </Box>
                      <NavLink to="/profile">
                        <MenuItem icon={<MdPerson />}>View Profile</MenuItem>
                      </NavLink>

                      {user && user.role === "admin" ? (
                        <NavLink to="/admin">
                          <MenuItem icon={<MdPerson />}>
                            Admin Dashboard
                          </MenuItem>
                        </NavLink>
                      ) : null}

                      {user && user.role === "mods" ? (
                        <NavLink to="/mods">
                          <MenuItem icon={<MdPerson />}>
                            Moderator Dashboard
                          </MenuItem>
                        </NavLink>
                      ) : null}

                      <LogoutUi>
                        <MenuItem icon={<MdLogout />}>Logout</MenuItem>
                      </LogoutUi>
                    </MenuList>
                  </Menu>
                ) : (
                  <LoginModal>
                    <Avatar icon={<MdPerson />} boxSize={"10"} />
                  </LoginModal>
                )}
              </Flex>
            </Box>
          </Flex>
        </Show>

        <Show below="md">
          <Flex alignItems="center" justifyContent={"space-between"}>
            <DrawerMenu>
              <HamburgerIcon fontSize={"25"} />
            </DrawerMenu>

            <Image src={angnaLogo} height="8" />
            {isAuthenticated ? (
              <NavLink to="/profile">
                <Avatar
                  name={user && user.name}
                  src={user && user.avatar ? user.avatar.url : ""}
                  boxSize={"10"}
                />
              </NavLink>
            ) : (
              <LoginDrawer>
                <Avatar
                  id="headerLoginButton"
                  icon={<MdPerson />}
                  boxSize={"10"}
                />
              </LoginDrawer>
            )}
          </Flex>
        </Show>
      </Box>
    </>
  );
};

export default Header;
