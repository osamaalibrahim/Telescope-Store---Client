import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function SignInAlert() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Sorry!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>You need to sign in first</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="blue" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
            <Button
              colorScheme="blue"
              ml={3}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SignInAlert;
