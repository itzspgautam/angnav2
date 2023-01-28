import {
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdArrowDropDown, MdLogout, MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import angnaLogo from "../../../Assets/Images/AngnaLogo.svg";
import LogoutUi from "../../../Components/Authentication/LogoutUi";
const Header = () => {
  const { user } = useSelector((state) => state.User);

  return (
    <Box bg="white" h="100%" borderRadius={"lg"} p="2" px="4">
      <Center justifyContent={"space-between"} alignItems="center" h="100%">
        <Image src={angnaLogo} boxSize="100px" mx="2" />
        <Menu>
          <MenuButton transition="all 0.2s">
            <HStack>
              <MdPerson fontSize={"20px"} />
              <MdArrowDropDown fontSize={"20"} />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              w="100%"
              flexDirection={"column"}
            >
              <Image
                src={user.avatar.url}
                boxSize="100px"
                borderRadius={"lg"}
              />
              <Heading size="sm" as="h3" mt="2">
                {user.name}
              </Heading>
              <Text
                color={"blackAlpha.700"}
                fontWeight="bold"
                w="100%"
                bg="yellow.200"
                textAlign={"center"}
                mt="1"
              >
                {user.role.toUpperCase()}
              </Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <MdPerson /> &nbsp; View Profile
            </MenuItem>

            <LogoutUi>
              <MenuItem>
                <MdLogout /> &nbsp; Logout
              </MenuItem>
            </LogoutUi>
          </MenuList>
        </Menu>
      </Center>
    </Box>
  );
};

export default Header;
