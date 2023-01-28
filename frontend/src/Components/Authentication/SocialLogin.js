import { Box, Button, Center, Divider, Text } from "@chakra-ui/react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuthentication } from "../../Config/FirebaseConfig";
import { loginWithSocial } from "../../Redux/Actions/UserActions";

const SocialLogin = () => {
  const Dispatch = useDispatch();
  const { socialLoginLoading } = useSelector((state) => state.User);
  const fbProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const socialLoginHandle = async (provider) => {
    Dispatch(
      loginWithSocial(signInWithPopup, firebaseAuthentication, provider)
    );
  };
  return (
    <Box>
      <Center py="1">
        <Text fontSize={"12px"} fontWeight="semibold">
          OR CONTINUE WITH
        </Text>
      </Center>
      <Center gap={2}>
        <Button
          isLoading={socialLoginLoading ? true : false}
          size="sm"
          colorScheme="facebook"
          leftIcon={<FaFacebook />}
          onClick={() => {
            socialLoginHandle(fbProvider);
          }}
        >
          Facebook
        </Button>
        <Button
          isLoading={socialLoginLoading ? true : false}
          size="sm"
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() => {
            socialLoginHandle(googleProvider);
          }}
        >
          Google
        </Button>
      </Center>
    </Box>
  );
};

export default SocialLogin;
