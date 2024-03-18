import React, { useEffect, useCallback } from "react";
import { useShop } from "../contexts/ShopContext";
import { Box, Stack, Heading, Flex, HStack, Link } from "@chakra-ui/react";
import { CartItem } from "../components/CartItem";
import { CartOrderSummary } from "../components/CartOrderSummary";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
function Cart() {
  const {
    cartItems,
    fetchCartItems,
    products,
    fetchProducts,
    removeFromCart,
    updateQuantity,
  } = useShop();

  const { isAuth } = useAuth();

  const updateData = useCallback(async () => {
    await Promise.all([fetchCartItems(), fetchProducts()]);
  }, [fetchCartItems, fetchProducts]);

  useEffect(() => {
    updateData();
  }, []);

  const productsInCart = cartItems.map((item) => {
    const product = products.find((product) => product.id === item.productId);
    return {
      ...product,
      quantity: item.quantity, // Corrected typo here
      onClickDelete: () => removeFromCart(item),
      onChangeQuantity: (newQuantity) =>
        updateQuantity(product.id, newQuantity),
    };
  });

  const totalPrice = productsInCart
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation to apply when component is mounted
      transition={{ duration: 1 }} // Animation duration
    >
      <Box
        maxW={{ base: "3xl", lg: "7xl" }}
        mx="auto"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: 20, md: 28 }}
      >
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2" align="center">
            <Heading fontSize="2xl" fontWeight="extrabold">
              {isAuth
                ? `Shopping Cart (${productsInCart.length} items)`
                : "Shopping Cart (0 items)"}
            </Heading>

            <Stack spacing="6">
              {isAuth &&
                productsInCart.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CartOrderSummary price={totalPrice} />
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link as={NavLink} to="/store" color="blue.500">
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </motion.div>
  );
}

export default Cart;
