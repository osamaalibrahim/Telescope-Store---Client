import React from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ThemeToggler from "../components/ThemeToggler";
import { useAuth } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import brightstar from "../images/brightstar.png";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, logout } = useAuth();
  const path = useLocation().pathname;

  const handleSignOut = () => {
    axios.get("http://localhost:3001/auth/logout");
    toast.success("Logged out successfully!");
    setTimeout(() => {}, 500);
    logout();
    localStorage.removeItem("accessToken");
  };

  const handleDarwerSignOut = () => {
    axios.get("http://localhost:3001/auth/logout");
    toast.success("Logged out successfully!");
    setTimeout(() => {}, 500);
    logout();
    localStorage.removeItem("accessToken");
    onClose();
  };

  const NavBarButton = ({ link, text, onClick }) => {
    {
      if (text !== "Sign Out") {
        return (
          <Box
            as={NavLink}
            to={link}
            color={path === link ? "teal" : ""}
            fontWeight={path === link ? "bold" : "normal"}
            mx={4}
            fontSize="2xl"
            fontFamily="Serif"
            onClick={onClick}
          >
            {text}
          </Box>
        );
      } else {
        return (
          <Box
            as={NavLink}
            to={link}
            mx={4}
            fontSize="2xl"
            fontFamily="Serif"
            onClick={onClick}
          >
            {text}
          </Box>
        );
      }
    }
  };

  return (
    <Box
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Flex px={4} py={3} align="center" justify="space-between">
        <Avatar src={brightstar} size="lg"  />
        <IconButton
          display={{ base: "flex", xl: "none" }}
          onClick={onOpen}
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody mt="70px">
              <VStack spacing="4">
                <NavBarButton onClick={onClose} link="/" text="Home" />
                <NavBarButton onClick={onClose} link="/store" text="Store" />
                <NavBarButton
                  onClick={onClose}
                  link="/gathering"
                  text="Gatherings"
                />
                <NavBarButton
                  onClick={onClose}
                  link="/calender"
                  text="Calender"
                />
                <NavBarButton onClick={onClose} link="/about" text="About Us" />
                <NavBarButton
                  onClick={onClose}
                  link="/support"
                  text="Support"
                />
                <NavBarButton
                  onClick={onClose}
                  link="/cart"
                  text={<AiOutlineShoppingCart />}
                />
                {isAuth ? (
                  <>
                    <NavBarButton
                      onClick={handleDarwerSignOut}
                      link="/"
                      text="Sign Out"
                    />
                  </>
                ) : (
                  <>
                    <NavBarButton
                      onClick={onClose}
                      link="/login"
                      text="Sign In"
                    />
                    <NavBarButton
                      onClick={onClose}
                      link="/register"
                      text="Sign Up"
                    />
                  </>
                )}

                <ThemeToggler />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Flex
          display={{ base: "none", xl: "flex" }}
          justify="center"
          alignItems="center"
          ml="auto"
          mr="auto"
        >
          <ThemeToggler />
          <NavBarButton link="/" text="Home" />
          <NavBarButton link="/store" text="Store" />
          <NavBarButton link="/gathering" text="Gatherings" />
          <NavBarButton link="/calender" text="Calender" />
          <NavBarButton link="/about" text="About Us" />
          <NavBarButton link="/support" text="Support" />
          <NavBarButton link="/cart" text={<AiOutlineShoppingCart />} />
          {isAuth ? (
            <>
              <NavBarButton link="/" onClick={handleSignOut} text="Sign Out" />
            </>
          ) : (
            <>
              <NavBarButton link="/login" text="Sign In" />
              <NavBarButton link="/register" text="Sign Up" />
            </>
          )}
        </Flex>
      </Flex>
      <Divider />
      <Toaster />
    </Box>
  );
};

export default Navbar;
