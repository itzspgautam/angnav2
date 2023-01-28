import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Box,
  Text,
  VStack,
  Link,
  Center,
  Badge,
} from "@chakra-ui/react";
import { MdDownload, MdFileDownload } from "react-icons/md";

export const PartView = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <span onClick={onOpen}>{props.children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.p.uploaded_data.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb="5">
            <Center bg="teal.500" p="2" borderRadius={"md"} mb="2">
              <Text fontWeight={"medium"} color="white">
                {props.p.contest.title.toUpperCase()}
              </Text>
            </Center>
            {props.p.contest.file_type === "Image" ? (
              <Center
                bg="teal.100"
                p="2"
                borderRadius={"md"}
                mb="2"
                flexDirection={"column"}
                gap="4"
              >
                <Image
                  src={props.p.uploaded_data.file.url}
                  borderRadius={"md"}
                />
                <a
                  href={props.p.uploaded_data.file.url}
                  download={props.p.uploaded_data.file.public_id}
                >
                  <Button w="100%">
                    <MdDownload />
                    Download This File
                  </Button>
                </a>
              </Center>
            ) : props.p.contest.file_type === "Document" ||
              props.p.contest.file_type === "PDF" ? (
              <Link href={props.p.uploaded_data.file.url} target="_blank">
                <VStack
                  bg="gray.200"
                  _hover={{ bg: "gray.300" }}
                  p="5"
                  borderRadius={"lg"}
                >
                  <MdFileDownload fontSize={"130"} />
                  <Text fontWeight={"semibold"}>Download Document</Text>
                </VStack>
              </Link>
            ) : props.p.contest.file_type === "Video/Audio" ? (
              <Center
                borderRadius={"lg"}
                overflow="hidden"
                mt="4"
                gap={4}
                flexDirection={"column"}
              >
                <video loop autoPlay controls>
                  <source
                    src={props.p.uploaded_data.file.url}
                    type="video/mp4"
                  />
                </video>
                <a
                  href={props.p.uploaded_data.file.url}
                  download={props.p.uploaded_data.file.public_id}
                >
                  <Button w="100%">
                    <MdDownload />
                    Download This File
                  </Button>
                </a>
              </Center>
            ) : props.p.contest.file_type === "na" ? (
              <Center>
                <Text>File is not required for this contest.</Text>
              </Center>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
