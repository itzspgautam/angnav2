import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Center,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaExclamationTriangle,
  FaEye,
  FaFacebook,
  FaFacebookF,
  FaGoogle,
  FaPhone,
  FaUserEdit,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/Actions/UserActions";
const Users = () => {
  const Dispatch = useDispatch();

  const { users } = useSelector((state) => state.User);
  useEffect(() => {
    Dispatch(getAllUsers());
  }, []);

  return (
    <Box>
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
        <TableContainer
          pb="10"
          w="100%"
          css={{
            "&::-webkit-scrollbar": {
              width: "2px",
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              width: "1px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "teal",
              borderRadius: "24px",
            },
          }}
        >
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Sl.</Th>
                <Th>Auth</Th>
                <Th>User</Th>
                <Th>IAM</Th>
                <Th>Designation</Th>
                <Th>Gender</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th isNumeric>View | Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((u, i, arr) => (
                  <Tr>
                    <Td>
                      <Text>{i + 1}</Text>
                    </Td>
                    <Td>
                      {u.authProvider === "google.com" ? (
                        <IconButton
                          size={"xs"}
                          icon={<FaGoogle />}
                          colorScheme="red"
                        />
                      ) : u.authProvider === "phone" ? (
                        <IconButton
                          size={"xs"}
                          icon={<FaPhone />}
                          colorScheme="green"
                        />
                      ) : u.authProvider === "facebook.com" ? (
                        <IconButton
                          size={"xs"}
                          icon={<FaFacebookF />}
                          colorScheme="facebook"
                        />
                      ) : (
                        <IconButton
                          size={"xs"}
                          icon={<FaExclamationTriangle />}
                          colorScheme="yellow"
                        />
                      )}
                    </Td>
                    <Td alignItems={"center"} display="flex" gap={2}>
                      <Avatar name={u.name} src={u.avatar.url} size={"sm"} />
                      <Text>
                        {u.name ? (
                          u.name
                        ) : (
                          <Text color="red">Profile not updated</Text>
                        )}
                      </Text>
                    </Td>

                    <Td textAlign={"center"}>
                      {u.iAm && u.iAm.iAm_type ? (
                        <Badge
                          w="100%"
                          bg={"teal.500"}
                          color="white"
                          py="1"
                          px="2"
                          textAlign={"center"}
                          fontSize={10}
                        >
                          {u.iAm.iAm_type}
                        </Badge>
                      ) : (
                        <Badge
                          w="100%"
                          textAlign={"center"}
                          fontSize={10}
                          bg={"red.100"}
                          color="white"
                          py="1"
                          px="2"
                        >
                          Not Updated
                        </Badge>
                      )}
                    </Td>
                    <Td textAlign={"center"}>
                      {u.iAm && u.iAm.iAm_designation ? (
                        <Badge
                          w="100%"
                          bg={"teal.500"}
                          color="white"
                          py="1"
                          px="2"
                          textAlign={"center"}
                          fontSize={10}
                        >
                          {u.iAm.iAm_designation}
                        </Badge>
                      ) : (
                        <Badge
                          w="100%"
                          textAlign={"center"}
                          fontSize={10}
                          bg={"red.100"}
                          color="white"
                          py="1"
                          px="2"
                        >
                          Not Updated
                        </Badge>
                      )}
                    </Td>

                    <Td fontWeight={"medium"}>
                      {u.gender ? (
                        u.gender
                      ) : (
                        <span style={{ color: "red" }}>Na</span>
                      )}
                    </Td>
                    <Td fontWeight={"medium"}>
                      {u.email ? (
                        u.email
                      ) : (
                        <span style={{ color: "red" }}>Na</span>
                      )}
                    </Td>
                    <Td fontWeight={"medium"}>
                      {u.phone ? (
                        "+" + u.phone
                      ) : (
                        <span style={{ color: "red" }}>Na</span>
                      )}
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
    </Box>
  );
};

export default Users;
