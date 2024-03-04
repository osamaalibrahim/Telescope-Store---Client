import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react"; // Import Box from Chakra UI

function RootLayout() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}

export default RootLayout;
