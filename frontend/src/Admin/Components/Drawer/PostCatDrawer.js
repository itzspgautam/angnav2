import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Box,
  HStack,
  Image,
  VStack,
  GridItem,
  Grid,
  Text,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";
import {
  createPostCategory,
  loadPostCategory,
} from "../../../Redux/Actions/PostAction";
export const PostCatDrawer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const fileRef = useRef();
  const Dispatch = useDispatch();
  const { postLoading, postCategories, success } = useSelector(
    (state) => state.Posts
  );

  const [catName, setCatName] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconPrev, setIconPrev] = useState(null);

  const selectFileHandle = (e) => {
    const addedFile = e.target.files[0];
    setIconPrev(URL.createObjectURL(addedFile));
    setIcon(addedFile);
  };

  const handleSubmit = () => {
    Dispatch(createPostCategory(icon, catName));
  };

  useEffect(() => {
    if (success) {
      setCatName("");
      setIcon(null);
      setIconPrev(null);
    }
  }, [success, Dispatch]);

  useEffect(() => {
    Dispatch(loadPostCategory());
  }, [Dispatch]);

  return (
    <>
      <span ref={btnRef} onClick={onOpen}>
        {props.children}
      </span>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Category</DrawerHeader>

          <DrawerBody
            p="4"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "gray",
                borderRadius: "24px",
              },
            }}
            display="flex"
            flexDir={"column"}
            justifyContent="space-between"
          >
            <Box>
              <Stack spacing={"5"}>
                <Input
                  type={"text"}
                  placeholder="Category Name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                />
                <HStack>
                  <Box flex="1">
                    <Center
                      borderRadius={"lg"}
                      bg="orange.100"
                      p="1"
                      mt="2"
                      h="150px"
                      flexDir={"column"}
                      onClick={() => fileRef.current.click()}
                      _hover={{ bg: "orange.200" }}
                    >
                      <FaPlus fontSize={"25px"} />{" "}
                      {icon ? "Upload Another" : "Upload Icon"}
                      <Input
                        type="file"
                        placeholder="Category Name"
                        ref={fileRef}
                        display="none"
                        accept="Image/png"
                        onChange={selectFileHandle}
                      />
                    </Center>
                  </Box>
                  <Box flex="1">
                    <Center
                      borderRadius={"lg"}
                      bg="orange.100"
                      p="1"
                      mt="2"
                      h="150px"
                      flexDir={"column"}
                    >
                      <Box>
                        {icon && <Image boxSize={"50"} src={iconPrev} />}
                      </Box>
                      <Text fontSize={"md"} noOfLines="1">
                        {catName}
                      </Text>
                    </Center>
                  </Box>
                </HStack>
              </Stack>
            </Box>
            <Box>
              <Text mt="10">All Categories</Text>
              <Grid templateColumns="repeat(4, 1fr)" gap={2} mt="2">
                {postCategories &&
                  postCategories.map((cat) => (
                    <GridItem key={cat._id}>
                      <VStack
                        borderRadius={"lg"}
                        bg="orange.100"
                        p="2"
                        boxSize={"90px"}
                      >
                        <Box>
                          <Image boxSize={"45px"} src={cat.icon.url} />
                        </Box>
                        <Text fontSize={"11px"} noOfLines="1">
                          {cat.name}
                        </Text>
                      </VStack>
                    </GridItem>
                  ))}
              </Grid>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={postLoading ? true : false}
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Create New
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
