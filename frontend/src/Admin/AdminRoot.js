import { Box, Center, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdLaptop } from "react-icons/md";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddEvent from "./Components/Event/AddEvent";
import UpdateEvent from "./Components/Event/UpdateEvent";
import Header from "./Components/Nav/Header";
import Sidebar from "./Components/Nav/Sidebar";
import AddPost from "./Components/Update/AddUpdate";
import UpdatePost from "./Components/Update/UpdatePost";
import Dashboard from "./Pages/Dashboard";
import Donation from "./Pages/Donation";
import Events from "./Pages/Events";
import Participation from "./Pages/Participation";
import Updates from "./Pages/Updates";
import Users from "./Pages/Users";

export const AdminRoot = () => {
  const { user } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  useEffect(() => {
    if (user.role !== "admin") navigate("/");
    return;
  }, []);

  return (
    <Box bg="#F6FAFD">
      <Center
        h="100vh"
        flexDir={"column"}
        display={{ base: "flex", md: "none" }}
      >
        <MdLaptop fontSize={"50px"} />
        <Heading size={"md"}>Please open in Desktop.</Heading>
      </Center>
      <Box display={{ base: "none", md: "block" }}>
        <Grid
          templateAreas={`"nav header"
                  "nav main"
                  `}
          gridTemplateRows={"70px 1fr"}
          gridTemplateColumns={sidebarCollapse ? "100px 1fr" : "280px 1fr"}
          h="100vh"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem p="1" area={"header"} bg="transparent">
            <Header />
          </GridItem>
          <GridItem p="1" area={"nav"}>
            <Sidebar
              sidebarCollapse={sidebarCollapse}
              setSidebarCollapse={setSidebarCollapse}
            />
          </GridItem>
          <GridItem p="1" area={"main"} overflowY={"scroll"}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/new" element={<AddEvent />} />
              <Route path="/events/update/:id" element={<UpdateEvent />} />

              <Route path="/updates" element={<Updates />} />
              <Route path="/updates/new" element={<AddPost />} />
              <Route path="/updates/update/:id" element={<UpdatePost />} />

              <Route path="/participation" element={<Participation />} />

              <Route path="/donation" element={<Donation />} />
            </Routes>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
