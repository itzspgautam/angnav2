import {
  Box,
  Center,
  Divider,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaAward, FaBars, FaComment, FaDonate, FaTable } from "react-icons/fa";
import { MdEvent, MdHome, MdPerson, MdTab, MdTableView } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarCollapse, setSidebarCollapse }) => {
  const sideMenu = [
    { title: "Dashboard", icon: <MdHome />, link: "/" },
    { title: "Users", icon: <MdPerson />, link: "/users" },
    { title: "Events", icon: <MdEvent />, link: "/events" },
    { title: "Updates", icon: <MdTableView />, link: "/updates" },
    // { title: "Contest", icon: <FaAward />, link: "/contest" },
    { title: "Participation", icon: <FaTable />, link: "/participation" },
    { title: "Donation", icon: <FaDonate />, link: "/donation" },
    // { title: "Feedback", icon: <FaComment />, link: "/feedback" },
  ];

  const [active, setActive] = useState("/");
  return (
    <Box bg="white" h="100%" borderRadius={"lg"} px="4">
      <Center
        h="60px"
        justifyContent={sidebarCollapse ? "center" : "space-between"}
      >
        {!sidebarCollapse && (
          <Heading size="sm" as="h1">
            ANGNA ADMIN
          </Heading>
        )}
        <IconButton
          bg={"white"}
          icon={<FaBars />}
          onClick={() => {
            setSidebarCollapse(!sidebarCollapse);
          }}
        />
      </Center>
      <Divider mb="5" mt="2" />

      <VStack>
        {sideMenu.map((menu) => (
          <span
            key={menu.title}
            style={{
              width: "100%",
            }}
          >
            <NavLink
              end
              to={`/admin${menu.link}`}
              className={({ isActive }) =>
                isActive ? "adminSideNavActive" : ""
              }
            >
              <Box
                bg={"white"}
                className="menuBtn"
                w="full"
                p="2"
                borderRadius="xl"
                display="flex"
                alignItems={"center"}
                justifyContent={sidebarCollapse ? "center" : "left"}
                cursor="pointer"
                _hover={{ bg: "orange.100", color: "white", transition: ".3s" }}
              >
                <Tooltip placement="right" label={menu.title} bg="orange.300">
                  <IconButton
                    className="menuIcon"
                    icon={menu.icon}
                    boxShadow="sm"
                    bg="orange.300"
                    color={"white"}
                    borderRadius={"lg"}
                    size="sm"
                    _hover={{ bg: "white", color: "orange.300" }}
                  />
                </Tooltip>
                {sidebarCollapse ? (
                  ""
                ) : (
                  <Text
                    className="menuTitle"
                    fontSize={"sm"}
                    pl="2"
                    color={"blackAlpha.600"}
                  >
                    {menu.title}
                  </Text>
                )}
              </Box>
            </NavLink>
          </span>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
