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
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";

export default function ProductCard(props) {
  const IMAGE = require(`../images/${props.image}`);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { isAuth } = useAuth();

  const handleAddToCart = async (product) => {
    setLoading(true); // Set loading to true before calling addToCart
    try {
      await props.onAddToCart(product);
      setIsAdded(true);
      setLoading(false); // Set loading back to false after addToCart completes
    } catch (error) {
      setLoading(false); // Make sure to handle errors and set loading back to false
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Center p={8}>
        <Card w={{ base: "100%", xl: "500px" }}>
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
                {isAuth && (isAdded || props.isAdded) ? (
                  <Text color="green.600">
                    Added to cart <CheckIcon />
                  </Text>
                ) : (
                  <Button
                    disabled={loading}
                    colorScheme="blue"
                    onClick={handleAddToCart}
                  >
                    {loading ? "Adding to cart..." : "Add to Cart"}
                  </Button>
                )}
              </Box>
            </Flex>
          </CardFooter>
        </Card>
      </Center>
    </motion.div>
  );
}
