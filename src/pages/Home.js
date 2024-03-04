import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Animation from "../components/Animation";
import Navbar from "../layouts/Navbar";
function Home() {
  return (
    // <div>
    //   <motion.h1
    //     initial={{ x: -100, opacity: 0 }}
    //     animate={{ x: 0, opacity: 1 }}
    //     transition={{ duration: 1 }}
    //     style={{ fontSize: "4em" }} // Adjust the font size here
    //   >
    //     Welcome to the Home page!
    //   </motion.h1>
    // </div>
    <>
    <Animation component={<Hero/>}/>
    </>
  );
}

export default Home;
