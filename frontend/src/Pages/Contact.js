import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Image,
  Link,
  Center,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

import angnaCircleLogo from "../Assets/Images/angnaCircleLogo.png";
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contacts | Angna </title>
        <meta
          name="description"
          content="Contact us for any queries and  complains."
        />
        <link rel="canonical" href={window.location.origin + "/contact"} />
        <meta name="author" content="angna" />
        <meta
          name="keywords"
          content="angna,contacts, jnv angna, association of garhwa navodaya alumni, jnv garhwa, live councelling, live contest, live session, jawahar navodaya vidyalaya, nvs, jnv"
        />

        <meta property="og:title" content="Contacts | Angna" />
        <meta
          property="og:description"
          content="Contact us for any queries and  complains."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/contact"} />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/itzspgautam/image/upload/v1664638572/ANGNA/Og_images/gmejs5purk2tj89up4ce.jpg"
        />
      </Helmet>
      <Container maxW="full" centerContent overflow="hidden">
        <Flex>
          <Box
            bg="#02054B"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading>Contact</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                      Fill up the form below to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<MdPhone color="#1970F1" size="20px" />}
                        >
                          +91 98806 08314
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<MdEmail color="#1970F1" size="20px" />}
                        >
                          contact@jnvangna.com
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={
                            <MdLocationOn color="#1970F1" size="20px" />
                          }
                        >
                          JNV Garhwa, India
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <Link
                        href="https://facebook.com/jnvgangna"
                        target={"_blank"}
                      >
                        <IconButton
                          aria-label="facebook"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<FaFacebook size="28px" />}
                        />
                      </Link>
                      <Link
                        href="https://instagram.com/jnvgangna"
                        target={"_blank"}
                      >
                        <IconButton
                          aria-label="Instagram"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "purple" }}
                          icon={<FaInstagram size="28px" />}
                        />
                      </Link>
                      <Link href="mailto:contact@jnvangna.com">
                        <IconButton
                          aria-label="Email"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "red" }}
                          icon={<FaEnvelope size="25px" />}
                        />
                      </Link>
                      <Link href="https://twitter.com/angna_official">
                        <IconButton
                          aria-label="Call"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "aqua" }}
                          icon={<FaTwitter size="25px" />}
                        />
                      </Link>
                    </HStack>
                  </Box>
                </WrapItem>
                <WrapItem w={{ base: "100%", md: "35%" }}>
                  <Center bg="white" borderRadius="lg" w="100%">
                    <Image src={angnaCircleLogo} />
                  </Center>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Contact;
