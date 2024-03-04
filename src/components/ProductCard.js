import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function ProductCard(props) {
  const IMAGE = require(`../images/${props.image}`);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Center p={8}>
        <Card w={{ base: "100%", md: "400px", sm: "200px" }}>
          <CardBody align="center">
            <Image
              src={IMAGE}
              alt="Product Image"
              borderRadius="lg"
              maxW={{ base: "100%", sm: "150%" }}
              maxH="300px"
              objectFit="cover"
            />
            <Stack mt="6" align="center">
              <Heading size="lg">{props.name}</Heading>
              <Text>{props.description}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex
              justifyContent="space-between"
              alignItems="flex-end"
              width="100%"
            >
              <Box>
                <Text color="blue.600" fontSize="2xl">
                  {props.price} SR
                </Text>
              </Box>
              <Box>
                <Button colorScheme="blue" onClick={props.onAddToCart}>
                  Add to Cart
                </Button>
              </Box>
            </Flex>
          </CardFooter>
        </Card>
      </Center>
    </motion.div>
  );
}
