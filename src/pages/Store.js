import React, { useEffect, useCallback } from "react";
import Animation from "../components/Animation";
import ProductCard from "../components/ProductCard";
import { Flex, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useShop } from "../contexts/ShopContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Store() {
  const { isAuth } = useAuth();
  const { addToCart, products, fetchProducts, fetchCartItems, cartItems } =
    useShop();

  const handleAddToCart = async (product) => {
    if (isAuth) {
      try {
        await addToCart(product);
        await updateData();
      } catch (error) {
        toast.error("Failed to add to cart!");
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.error("Please Sign in to add to cart!");
    }
  };
  useEffect(() => {
    updateData();
  }, []);

  const updateData = useCallback(async () => {
    await Promise.all([fetchProducts(), fetchCartItems()]);
  }, [fetchProducts, fetchCartItems]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation to apply when component is mounted
      transition={{ duration: 1 }} // Animation duration
    >
      <Stack spacing={8} align="center" py={{ base: 20, xl: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", xl: "6xl" }}
          fontFamily="Serif"
          lineHeight={"110%"}
          align="center"
          px={{ base: 4, xl: 8 }}
        >
          Discover Our Exclusive{" "}
          <Text as={"span"} color={"blue.400"}>
            Products!
          </Text>
        </Heading>
        <Flex
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
          justify="center"
          align="center"
        >
          {products.map((product, index) => {
            // Assuming product.id is a unique identifier for each product
            return (
              <Box m={4} key={product.id}>
                <Animation
                  component={
                    <ProductCard
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      image={product.image}
                      onAddToCart={() => handleAddToCart(product)}
                      isAdded={cartItems.some(
                        (item) => item.productId === product.id
                      )}
                    />
                  }
                />
              </Box>
            );
          })}
        </Flex>
      </Stack>
    </motion.div>
  );
}

export default Store;
