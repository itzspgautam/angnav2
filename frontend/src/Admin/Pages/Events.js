import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
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
  useToast,
} from "@chakra-ui/react";
import { FaEye, FaPlus, FaRegEdit, FaTrash, FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEventErrors,
  clearEventSuccess,
  deleteEvent,
  loadEvent,
} from "../../Redux/Actions/EventAction";
import { NavLink } from "react-router-dom";
import moment from "moment";
import DeleteAlert from "../Components/Alert/DeleteAlert";
const Events = () => {
  const Dispatch = useDispatch();
  const toast = useToast();
  const { eventLoading, events, success, error, deleteLoading } = useSelector(
    (state) => state.Event
  );

  const deleteHandle = (id) => {
    Dispatch(deleteEvent(id));
  };

  useEffect(() => {
    Dispatch(loadEvent());
  }, [Dispatch, success]);

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
      Dispatch(clearEventErrors());
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
      Dispatch(clearEventSuccess());
    }
  }, [error, success, Dispatch, toast]);

  return (
    <>
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
          <TableContainer w="100%">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Date</Th>
                  <Th isNumeric>EDIT | Edit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {events &&
                  events.map((e) => (
                    <Tr key={e._id}>
                      <Td alignItems={"center"} display="flex" gap={2}>
                        <Avatar
                          borderRadius={"0"}
                          name="Suraj Gautamfd"
                          size={"lg"}
                          src={e.poster.url}
                        />

                        <Text
                          w="40%"
                          overflow={"hidden"}
                          textOverflow="ellipsis"
                          whiteSpace={"nowrap"}
                        >
                          {e.title}
                        </Text>
                      </Td>

                      <Td fontWeight={"medium"}>
                        {moment(e.createdDate).format("MM/DD/YYYY")}
                      </Td>

                      <Td isNumeric>
                        <NavLink to={`/admin/events/update/${e._id}`}>
                          <IconButton
                            ml="1"
                            size={"sm"}
                            icon={<FaRegEdit />}
                            colorScheme="whatsapp"
                          />
                        </NavLink>
                        <DeleteAlert
                          itemId={e._id}
                          func={deleteHandle}
                          loading={deleteLoading}
                          success={success}
                          title={e.title}
                          type="Event"
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

      <Box position={"fixed"} bottom="5" right="10">
        <NavLink to="/admin/events/new">
          <Button leftIcon={<FaPlus />} size="md" bg="orange.300">
            Add Event
          </Button>
        </NavLink>
      </Box>
    </>
  );
};

export default Events;
