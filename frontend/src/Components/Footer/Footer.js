import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import {
  Button,
  Box,
  Center,
  Container,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import React from "react";
import {
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../../Assets/Images/AngnaLogo.svg";
import DevLogo from "../../Assets/Images/devLogo.png";
import PaymentModal from "../Payment/PaymentModal";

const Footer = () => {
  return (
    <Box bg="blackAlpha.800" color={"whiteAlpha.600"} pt="4">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Image
          src={Logo}
          w={{ base: "20%", md: "10%" }}
          alt="Angna Logo"
          title="Angna Logo"
          loading="lazy"
        />
        <Stack direction={"row"} spacing={6}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/updates">Updates</NavLink>
          <NavLink to="/about">Abouts</NavLink>
          <NavLink to="/contact">Contacts</NavLink>
        </Stack>
        <Stack>
          <PaymentModal>
            <Button colorScheme={"orange"} size="sm" borderRadius={2}>
              Donate Us
            </Button>
          </PaymentModal>
        </Stack>
      </Container>
      <Box>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontSize="sm">© 2022 ANGNA. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <Link href="https://facebook.com/jnvgangna" target={"_blank"}>
              <IconButton
                size="sm"
                colorScheme="facebook"
                aria-label="Facebook"
                fontSize="20px"
                icon={<FaFacebook />}
              />
            </Link>

            <Link href="https://instagram.com/jnvgangna" target={"_blank"}>
              <IconButton
                size="sm"
                colorScheme="purple"
                aria-label="Facebook"
                fontSize="20px"
                icon={<FaInstagram />}
              />
            </Link>
            <Link href="https://twitter.com/angna_official" target={"_blank"}>
              <IconButton
                size="sm"
                colorScheme="twitter"
                aria-label="Facebook"
                fontSize="20px"
                icon={<FaTwitter />}
              />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCcXG_16KYw7IOXu-xcWmBgg"
              target={"_blank"}
            >
              <IconButton
                size="sm"
                colorScheme="red"
                aria-label="Youtube"
                fontSize="20px"
                icon={<FaYoutube />}
              />
            </Link>
          </Stack>
        </Container>
      </Box>
      <Box bg="blackAlpha.900" p="2">
        <Center
          flexDir={{ base: "column", lg: "row" }}
          gap="2"
          alignItems={"center"}
        >
          <Image
            filter={"auto"}
            invert=""
            src={DevLogo}
            w={{ base: "20%", md: "8%" }}
            alt="Itzspgautam"
            title="Suraj Prakash Gautam"
            loading="lazy"
          />
          <Text
            display={"flex"}
            alignItems="center"
            fontSize={"12px"}
            fontWeight="light"
            color="whiteAlpha.600"
          >
            Developed with{" "}
            <FaHeart style={{ margin: "0 5px", color: "#EE3D24" }} /> by Suraj
            Prakash Gautam{" "}
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default Footer;
