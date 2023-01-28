import { Center, Heading, Image, Show } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import LoginModal from "../Components/Authentication/LoginModal";
import profileDefault from "../Assets/Images/profile_default.png";
import LoginDrawer from "../Components/Authentication/LoginDrawer";
import { Helmet } from "react-helmet";

const Protected = (props) => {
  const { isAuthenticated } = useSelector((state) => state.User);

  return (
    <>
      <Helmet>
        <title>Login </title>
      </Helmet>
      {isAuthenticated ? (
        props.children
      ) : (
        <>
          <Center display={"flex"} flexDirection={"column"}>
            <Image
              src={profileDefault}
              w={{ base: "300px", md: "350px", lg: "450px" }}
              borderRadius={"lg"}
            />
            <Heading size="md">Please login to access your Profile.</Heading>
          </Center>
          <Show above="lg">
            <LoginModal loginToAccess={true}></LoginModal>
          </Show>
          <Show below="lg">
            <LoginDrawer loginToAccess={true}></LoginDrawer>
          </Show>
        </>
      )}
    </>
  );
};

export default Protected;
