import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

export const ModsDashboard = () => {
  const { user } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  useEffect(() => {
    if (user.role !== "mods") navigate("/");
    return;
  }, []);

  return (
    <>
      <Helmet>
        <title>Alumni Meet Registration | Angna </title>
      </Helmet>

      <Center bg="blue.200" display={"flex"} h="100vh">
        <Stack spacing={5}>
          <NavLink to="/mods/meet/register">
            <Center
              h="50"
              w="100"
              bg="white"
              p="5"
              boxShadow={"md"}
              fontSize="xl"
              fontWeight={"bold"}
              borderRadius="md"
              color={"blackAlpha.800"}
              _hover={{
                boxShadow: "lg",
                bg: "whatsapp.500",
                color: "white",
              }}
            >
              Registratoin Desk
            </Center>
          </NavLink>
          {/* <NavLink>
            <Center
              h="50"
              w="100"
              bg="white"
              p="5"
              boxShadow={"md"}
              fontSize="xl"
              fontWeight={"bold"}
              borderRadius="md"
              color={"blackAlpha.800"}
              _hover={{
                boxShadow: "lg",
                bg: "whatsapp.500",
                color: "white",
              }}
            >
              Regisered Candidate
            </Center>
          </NavLink> */}
        </Stack>
      </Center>
    </>
  );
};
