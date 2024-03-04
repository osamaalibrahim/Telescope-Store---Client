import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Animation(props) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 2 }}
    >
      {props.component}
    </motion.div>
  );
}

export default Animation;
