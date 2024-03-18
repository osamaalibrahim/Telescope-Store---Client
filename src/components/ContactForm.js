import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

import "@fontsource/tajawal";

function infoButton({ text, link, icon }) {
  return (
    <Button
      size="md"
      height="48px"
      width="300px"
      variant="ghost"
      _hover={{ border: "2px solid #1C6FEB" }}
      leftIcon={icon}
      onClick={() => window.open(link, "_blank")}
    >
      {text}
    </Button>
  );
}

export default function Contactform(props) {
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    await props.handleSubmit(e);
    setLoading(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Container
        maxW="full"
        mt={0}
        centerContent
        overflow="hidden"
        id="contact"
        py={16}
      >
        <Flex>
          <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={10}>
              <Wrap spacing={{ base: 10, sm: 3, md: 5, lg: 20 }}>
                <WrapItem mx={10}>
                  <Box>
                    <VStack pl={0} spacing={3} justifyContent={"center"}>
                      <Heading
                        fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
                        fontFamily={"Tajawal"}
                      >
                        Contact Us
                      </Heading>
                      <Text
                        mt={{ sm: 3, md: 3, lg: 5 }}
                        fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
                        fontFamily={"Tajawal"}
                        align={"center"}
                      >
                        Please Fill this form to contact us
                      </Text>
                      <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                        <VStack pl={0} spacing={3} justifyContent={"center"}>
                          {infoButton({
                            text: "+966 50 153 3551",
                            link: "tel:+966501533551",
                            icon: <MdPhone size="20px" />,
                          })}
                          {infoButton({
                            text: "Brightstar.saudi@gmail.com",
                            link: "mailto:brightstar.saudi@gmail.com",
                            icon: <MdEmail size="20px" />,
                          })}
                          {infoButton({
                            text: "Saudi Arabia - Daharan",
                            link: "https://goo.gl/maps/N4mZwuKpy2nrzHZBA",
                            icon: <MdLocationOn size="20px" />,
                          })}
                        </VStack>
                      </Box>
                    </VStack>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box borderRadius="lg">
                    <Box m={8}>
                      <form onSubmit={handleSubmit}>
                        <VStack spacing={5} pl={10} justifyContent={"center"}>
                          <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <InputGroup
                              borderColor={
                                colorMode === "light" ? "black" : "white"
                              }
                            >
                              <InputLeftElement>
                                <BsPerson />
                              </InputLeftElement>
                              <Input
                                type="text"
                                size="md"
                                value={props.name}
                                onChange={(e) => props.setName(e.target.value)}
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup
                              borderColor={
                                colorMode === "light" ? "black" : "white"
                              }
                            >
                              <InputLeftElement>
                                <MdOutlineEmail />
                              </InputLeftElement>
                              <Input
                                type="email"
                                size="md"
                                value={props.email}
                                onChange={(e) => props.setEmail(e.target.value)}
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl id="text" isRequired>
                            <FormLabel>Your Message</FormLabel>
                            <Textarea
                              borderColor={
                                colorMode === "light" ? "black" : "white"
                              }
                              _hover={{
                                borderRadius: "gray.300",
                              }}
                              value={props.text}
                              onChange={(e) => props.setText(e.target.value)}
                            />
                          </FormControl>
                          <Button
                            type="submit"
                            variant="solid"
                            bgGradient="linear(to-r, blue.400, blue.500)"
                            _hover={{ bg: "blue.700" }}
                            color="white"
                          >
                            {loading ? "Loading..." : "Send"}
                          </Button>
                        </VStack>
                      </form>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
        <Toaster />
      </Container>
    </motion.div>
  );
}
