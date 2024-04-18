import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import Animation from "../components/Animation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

function Support() {
  const api = "http://localhost:3001";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage({ name, email, text });
  };

  const sendMessage = async ({ name, email, text }) => {
    try {
      const response = await axios.post(`${api}/message`, {
        name,
        email,
        text,
      });
      onOpen();
      setName("");
      setEmail("");
      setText("");
    } catch (error) {
      toast.error("There was an error sending your message. Please try again.");
      setName("");
      setEmail("");
      setText("");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation values
        animate={{ opacity: 1, y: 0 }} // Animation to apply when component is mounted
        transition={{ duration: 1 }} // Animation duration
      >
        <ContactForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          text={text}
          setText={setText}
          handleSubmit={handleSubmit}
        />
      </motion.div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Thank You !</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Your message has been placed successfully! Please check your email.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Support;
