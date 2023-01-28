import {
  Avatar,
  Badge,
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FaArrowAltCircleUp,
  FaDonate,
  FaEye,
  FaTable,
  FaTrophy,
  FaUser,
  FaUserCog,
  FaUserEdit,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllContest } from "../../Redux/Actions/ContestAction";
import { getAllParts } from "../../Redux/Actions/ParticipateAction";
import { getAllPayments } from "../../Redux/Actions/PaymentAction";
import { getAllUsers } from "../../Redux/Actions/UserActions";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  const Dispatch = useDispatch();

  const { users } = useSelector((state) => state.User);
  const { allParts } = useSelector((state) => state.Participation);
  const { payments } = useSelector((state) => state.Payment);
  const { contests } = useSelector((state) => state.Contests);

  const [totalPayment, setTotalPayment] = useState(0);

  const getTotlaPayment = (pays) => {
    if (!pays) return;
    var total = 0;
    pays.map((p) => {
      total +=
        p.amount / 100 -
        ((2 / 100) * (p.amount / 100) +
          (18 / 100) * (2 / 100) * (p.amount / 100));
    });
    setTotalPayment(total.toFixed(2));
  };

  useEffect(() => {
    Dispatch(getAllUsers());
    Dispatch(getAllParts());
    Dispatch(getAllPayments());
    getTotlaPayment(payments);
    Dispatch(getAllContest());
  }, [payments]);

  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem w="100%">
          <NavLink to={`users`}>
            <Center
              bg="white"
              p="5"
              borderRadius={"lg"}
              justifyContent={"space-between"}
              _hover={{ boxShadow: "sm" }}
            >
              <Box>
                <Text fontSize="12px" color={"blackAlpha.500"}>
                  REGISTERED USERS
                </Text>
                <Text size={"sm"} display="flex" alignItems={"center"}>
                  {users ? users.length : "00"} &nbsp;&nbsp;
                </Text>
              </Box>
              <IconButton bg="orange.300" color={"white"} icon={<FaUser />} />
            </Center>
          </NavLink>
        </GridItem>
        <GridItem w="100%" h="10">
          <NavLink to={`participation`}>
            <Center
              bg="white"
              p="5"
              borderRadius={"lg"}
              justifyContent={"space-between"}
              _hover={{ boxShadow: "sm" }}
            >
              <Box>
                <Text fontSize="12px" color={"blackAlpha.500"}>
                  PARTICIPATION
                </Text>
                <Tooltip>
                  <Text size={"sm"} display="flex" alignItems={"center"}>
                    {allParts && allParts.length} &nbsp;&nbsp;
                    <Text style={{ color: "#88D2A6" }}>
                      {allParts &&
                        allParts.filter(
                          (item) =>
                            new Date(item.submission_time).getTime() >
                            new Date().getTime() - 8.64e7
                        ).length}
                    </Text>
                    <FaArrowAltCircleUp color="#88D2A6" />
                  </Text>
                </Tooltip>
              </Box>
              <IconButton bg="orange.300" color={"white"} icon={<FaTrophy />} />
            </Center>
          </NavLink>
        </GridItem>

        <GridItem w="100%" h="10">
          <NavLink to={`donation`}>
            <Center
              bg="white"
              p="5"
              borderRadius={"lg"}
              justifyContent={"space-between"}
              _hover={{ boxShadow: "sm" }}
            >
              <Box>
                <Text fontSize="12px" color={"blackAlpha.500"}>
                  DONATION
                </Text>
                <Text size={"sm"} display="flex" alignItems={"center"}>
                  ₹{totalPayment} &nbsp;&nbsp;
                </Text>
              </Box>
              <IconButton bg="orange.300" color={"white"} icon={<FaDonate />} />
            </Center>
          </NavLink>
        </GridItem>

        <GridItem w="100%" h="10">
          <Center
            bg="white"
            p="5"
            borderRadius={"lg"}
            justifyContent={"space-between"}
            _hover={{ boxShadow: "sm" }}
          >
            <Box>
              <Text fontSize="12px" color={"blackAlpha.500"}>
                DONATION
              </Text>
              <Text size={"sm"} display="flex" alignItems={"center"}>
                ₹2567 &nbsp;&nbsp;
                <Text style={{ color: "#88D2A6" }}>₹590+</Text>
                <FaArrowAltCircleUp color="#88D2A6" />
              </Text>
            </Box>
            <IconButton bg="orange.300" color={"white"} icon={<FaTrophy />} />
          </Center>
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt="4">
        <GridItem w="100%" h="100%">
          <Center
            h="100%"
            bg="white"
            p="5"
            borderRadius={"lg"}
            _hover={{ boxShadow: "sm" }}
            flexDir="column"
            justifyContent="flex-start"
            alignItems={"start"}
          >
            <Box display={"flex"} alignItems="center" mb="4">
              <FaTable />{" "}
              <Text size={"md"} fontWeight="semibold" ml="2">
                Online Contest
              </Text>
            </Box>
            <Divider />

            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {contests &&
                contests.map((c) => (
                  <GridItem>
                    <NavLink to={`participation#${c._id}`}>
                      <Image src={c.banner.url} />
                    </NavLink>
                  </GridItem>
                ))}
            </Grid>
          </Center>
        </GridItem>
        <GridItem w="100%" h="100%">
          <Center
            h="100%"
            bg="white"
            p="5"
            borderRadius={"lg"}
            _hover={{ boxShadow: "sm" }}
            flexDir="column"
            justifyContent="flex-start"
            alignItems={"start"}
          >
            <Box display={"flex"} alignItems="center" mb="4">
              <FaUserCog />{" "}
              <Text size={"md"} fontWeight="semibold" ml="2">
                Admin and Moderators
              </Text>
            </Box>

            <TableContainer w="100%">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th isNumeric>View | Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users &&
                    users
                      .filter((item) => item.role === "admin")
                      .map((u) => (
                        <Tr key={u._id}>
                          <Td alignItems={"center"} display="flex" gap={2}>
                            <Avatar
                              name={u.name && u.name}
                              src={u.avatar && u.avatar.url && u.avatar.url}
                              size={"sm"}
                            />
                            <Text>{u.name && u.name}</Text>
                          </Td>
                          <Td>
                            <Badge p="1" bg={"yellow.400"}>
                              {u.role}
                            </Badge>
                          </Td>
                          <Td isNumeric>
                            <IconButton
                              size={"sm"}
                              icon={<FaEye />}
                              colorScheme="teal"
                            />
                            <IconButton
                              ml="1"
                              size={"sm"}
                              icon={<FaUserEdit />}
                              colorScheme="whatsapp"
                            />
                          </Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
