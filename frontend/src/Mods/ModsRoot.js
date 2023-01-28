import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import AlumniRegister from "./pages/AlumniRegister";
import { ModsDashboard } from "./pages/ModsDashboard";

export const ModsRoots = () => {
  const { user } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  useEffect(() => {
    if (user.role !== "mods") navigate("/");
    return;
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<ModsDashboard />} />
        <Route path="/meet/register" element={<AlumniRegister />} />
      </Routes>
    </>
  );
};
