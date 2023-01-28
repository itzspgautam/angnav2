import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DeleteAlert = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const proceedDelete = () => {
    props.func(props.itemId);
  };

  useEffect(() => {
    if (props.success) onClose();
  }, [props.success]);

  return (
    <>
      <span onClick={onOpen}>{props.children}</span>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {props.type}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete ?
              <br />
              <b>{props.title}</b> <br />
              You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={props.loading ? true : false}
                colorScheme="red"
                onClick={proceedDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;
