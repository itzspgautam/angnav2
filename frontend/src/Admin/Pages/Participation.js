import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Center,
  IconButton,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaEye,
  FaGoogle,
  FaPhone,
  FaTrash,
  FaUserEdit,
} from "react-icons/fa";
import {
  clearParticipateErrors,
  clearParticipateSuccess,
  deletePart,
  getAllParts,
} from "../../Redux/Actions/ParticipateAction";
import { useDispatch, useSelector } from "react-redux";
import { PartView } from "../Components/Participation/PartView";
import { getAllContest } from "../../Redux/Actions/ContestAction";
import moment from "moment";
import DeleteAlert from "../Components/Alert/DeleteAlert";
const Participation = () => {
  const Dispatch = useDispatch();
  const toast = useToast();

  const { allParts, deleteLoading, success, error } = useSelector(
    (state) => state.Participation
  );
  const { loading, contests } = useSelector((state) => state.Contests);

  const deleteHandle = (id) => {
    Dispatch(deletePart(id));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      Dispatch(clearParticipateErrors());
    }
    if (success) {
      toast({
        title: "Success",
        description: success,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      Dispatch(clearParticipateSuccess());
    }
  }, [error, success, Dispatch, toast]);

  useEffect(() => {
    Dispatch(getAllParts());
    Dispatch(getAllContest());
  }, []);
  return (
    <Box>
      {contests &&
        allParts &&
        contests.map((c) => (
          <Box
            borderRadius={"lg"}
            mt="10"
            bg="white"
            overflow={"hidden"}
            boxShadow="sm"
            key={c._id}
            id={c._id}
          >
            <Box p="2" bg="orange.200" w="100%">
              Participants of {c.title}
            </Box>
            <Center
              h="100%"
              p="5"
              _hover={{ boxShadow: "sm" }}
              flexDir="column"
              justifyContent="flex-start"
              alignItems={"start"}
            >
              <TableContainer w="100%">
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th w="5%">Sl. No.</Th>
                      <Th w="25%">Name</Th>

                      <Th w="10%">Group</Th>
                      <Th w="10%">Class</Th>
                      <Th w="25%">Email</Th>
                      <Th w="10%">Phone</Th>
                      <Th w="10%">Submited on</Th>
                      <Th isNumeric>View | Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {allParts
                      .filter((item) => item.contest._id === c._id)
                      .map((p, i, arr) => (
                        <Tr key={p._id}>
                          <Td>
                            <Text>{i + 1}</Text>
                          </Td>
                          <Td alignItems={"center"} display="flex" gap={2}>
                            <Avatar
                              name={p.uploaded_data.name}
                              size={"sm"}
                              src={p.contestant.avatar.url}
                              loading="lazy"
                            />
                            <Text>{p.uploaded_data.name} </Text>
                          </Td>

                          <Td fontWeight={"medium"}>{p.uploaded_data.group}</Td>
                          <Td fontWeight={"medium"}>
                            {p.uploaded_data.group_class}
                            <sup>th</sup>
                          </Td>

                          <Td fontWeight={"medium"}>{p.uploaded_data.email}</Td>
                          <Td fontWeight={"medium"}>{p.uploaded_data.phone}</Td>

                          <Td fontWeight={"medium"}>
                            {moment(p.submission_time).format("Do MMM, h:ma ")}
                          </Td>

                          <Td isNumeric>
                            <PartView p={p}>
                              <IconButton
                                size={"sm"}
                                icon={<FaEye />}
                                colorScheme="teal"
                              />
                            </PartView>

                            <DeleteAlert
                              itemId={p._id}
                              func={deleteHandle}
                              loading={deleteLoading}
                              success={success}
                              title={
                                "Participation of " +
                                p.uploaded_data.name +
                                ", in " +
                                p.contest.title
                              }
                              type="Post"
                            >
                              <IconButton
                                ml="1"
                                size={"sm"}
                                icon={<FaTrash />}
                                colorScheme="red"
                              />
                            </DeleteAlert>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Center>
          </Box>
        ))}
    </Box>
  );
};

export default Participation;
