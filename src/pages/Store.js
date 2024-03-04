import React, { useEffect, useCallback } from "react";
import Animation from "../components/Animation";
import ProductCard from "../components/ProductCard";
import { Flex, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useShop } from "../contexts/ShopContext";
import toast from "react-hot-toast";

function Store() {
  const { isAuth } = useAuth();
  const { addToCart, products, fetchProducts, fetchCartItems, cartItems } = useShop();

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
  }
  , [fetchProducts, fetchCartItems]);

  return (
    <Stack spacing={8} align="center" py={{ base: 20, md: 28 }}>
      <Heading
        fontWeight={600}
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        lineHeight={"110%"}
        align="center"
        px={{ base: 4, md: 8, lg: 12 }}
      >
        Discover Our Exclusive{" "}
        <Text as={"span"} color={"blue.400"}>
          Products!
        </Text>
      </Heading>
      <Flex direction="row" wrap="wrap" justify="center" align="center">
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
                    isAdded = {cartItems.some((item) => item.productId === product.id)}
                  />
                }
              />
            </Box>
          );
        })}
      </Flex>
    </Stack>
  );
}

export default Store;
