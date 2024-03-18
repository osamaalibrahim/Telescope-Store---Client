import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useShop } from "../contexts/ShopContext";

export const CartOrderSummary = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { isAuth } = useAuth();
  const { clearCart } = useShop();
  const handleCheckout = () => {
    if (!isAuth) {
      toast.error("You need to sign in first");
    } else if (props.price > 0) {
      onOpen();
      clearCart();
    } else {
      toast.error("Your cart is empty");
    }
  };

  return (
    <>
      <Stack
        spacing="8"
        borderWidth="1px"
        rounded="lg"
        padding="8"
        width="full"
      >
        <Heading size="md">Order Summary</Heading>

        <Stack spacing="6">
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {props.price} SR
            </Text>
          </Flex>
        </Stack>
        <Button
          colorScheme="blue"
          size="lg"
          fontSize="md"
          rightIcon={<FaArrowRight />}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </Stack>
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
            Your order has been placed successfully! Please check your email.
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
};
