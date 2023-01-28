import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  IconButton,
  Image,
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
import { NavLink } from "react-router-dom";
import moment from "moment";
import DeleteAlert from "../Components/Alert/DeleteAlert";
import {
  clearPostError,
  clearPostSuccess,
  deletePost,
  loadPosts,
} from "../../Redux/Actions/PostAction";
const Updates = () => {
  const Dispatch = useDispatch();
  const toast = useToast();
  const { postLoading, posts, success, error, deleteLoading } = useSelector(
    (state) => state.Posts
  );

  const deleteHandle = (id) => {
    Dispatch(deletePost(id));
  };

  useEffect(() => {
    Dispatch(loadPosts());
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
      Dispatch(clearPostError());
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
      Dispatch(clearPostSuccess());
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
                  <Th isNumeric>EDIT | DELETE</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posts &&
                  posts.map((e) => (
                    <Tr key={e._id}>
                      <Td alignItems={"center"} display="flex" gap={2}>
                        <Image
                          w="20"
                          borderRadius={"5"}
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
                        {moment(e.createdDate).format("DD/MM/YYYY")}
                      </Td>

                      <Td isNumeric>
                        <NavLink to={`/admin/updates/update/${e._id}`}>
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

      <Box position={"fixed"} bottom="5" right="10">
        <NavLink to="/admin/updates/new">
          <Button leftIcon={<FaPlus />} size="md" bg="orange.300">
            Create Post
          </Button>
        </NavLink>
      </Box>
    </>
  );
};

export default Updates;
