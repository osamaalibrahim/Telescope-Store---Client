import { Box, Text, useColorModeValue, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Box
        color={useColorModeValue("gray.700", "gray.200")}
        width="100%"
        textAlign="center"
      >
        <Divider bg="blackAlpha.300" />
        <Text py={5} fontSize={"md"}>
          BrightStar. All Copyrights Reserved 2024 © .
        </Text>
      </Box>
    </motion.div>
  );
}
