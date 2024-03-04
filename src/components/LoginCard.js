import React from "react";
import { motion } from "framer-motion";
import FormControlWithLeftIcon from "./FormControl";
import { VscAccount, VscLockSmall, VscMail } from "react-icons/vsc";
import telescopeImage from "../images/telescope.jpg";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  VStack,
  useColorMode,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";

function LoginCard(props) {
  const { colorMode } = useColorMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation to apply when component is mounted
      transition={{ duration: 1 }} // Animation duration
    >
      <Box>
        <Flex justify="center" align="center" height="80vh" mt={12}>
          <Center w={[300, 400, 500]}>
            <Stack spacing="4">
              <VStack spacing="6">
                <Heading
                  fontSize={["3xl", "4xl", "5xl"]}
                  fontWeight="500"
                  fontFamily="Serif"
                >
                  {props.register
                    ? "Create a new Account"
                    : "Welcome to BrightStar!"}
                </Heading>
              </VStack>
              <Card
                bg={colorMode === "light" ? "#f6f8fa" : "Light"}
                variant="outline"
                borderColor="#d8dee4"
                size="lg"
                borderRadius={8}
                boxShadow="dark-lg"
              >
                <Image objectFit="cover" maxW="100%" src={telescopeImage} />
                <CardBody>
                  <form onSubmit={props.handleSubmit}>
                    <Stack spacing="4">
                      {props.register && (
                        <FormControlWithLeftIcon
                          type="text"
                          value={props.name}
                          label="Name"
                          icon={VscAccount}
                          onChange={(e) => props.setName(e.target.value)}
                        />
                      )}
                      <FormControlWithLeftIcon
                        type="email"
                        value={props.email}
                        label="Email Adress"
                        icon={VscMail}
                        onChange={(e) => props.setEmail(e.target.value)}
                      />
                      <FormControlWithLeftIcon
                        type="password"
                        value={props.password}
                        label="Password"
                        icon={VscLockSmall}
                        onChange={(e) => props.setPassword(e.target.value)}
                      />
                      <Button
                        type="submit"
                        bg="#2da44e"
                        color="white"
                        size="sm"
                        _hover={{ bg: "#2c974b" }}
                        _active={{ bg: "#298e46" }}
                      >
                        {props.register ? "Create Account" : "Sign In"}
                      </Button>
                    </Stack>
                  </form>
                </CardBody>
              </Card>
              <Card variant="outline" borderColor="#d0d7de">
                <CardBody>
                  <Center>
                    <HStack fontSize="sm" spacing="1">
                      <Text>
                        {props.register
                          ? "Already Have an Account?"
                          : "New to BrightStar?"}
                      </Text>
                      <Link
                        color="#0969da"
                        href={props.register ? "/login" : "register"}
                      >
                        {props.register ? "Sign In." : "Create Account"}
                      </Link>
                    </HStack>
                  </Center>
                </CardBody>
              </Card>
            </Stack>
          </Center>
        </Flex>
      </Box>
    </motion.div>
  );
}

export default LoginCard;
