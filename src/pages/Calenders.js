import React, { useEffect, useState } from "react";
import Animation from "../components/Animation";
import EventCard from "../components/EventCard";
import { Flex, Box, Heading, Text, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";
function Calender() {
  const [CalenderList, setCalenderList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/event")
      .then((response) => {
        setCalenderList(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation to apply when component is mounted
      transition={{ duration: 1 }} // Animation duration
    >
      <Stack spacing={8} align={"center"} paddingY={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          fontFamily="Serif"
          lineHeight={"110%"}
          align={"center"}
          px={{ base: 4, md: 8, lg: 12 }}
        >
          All Coming Celestial{" "}
          <Text as={"span"} color={"blue.400"}>
            Events!
          </Text>
        </Heading>
        <Flex direction="row" wrap="wrap" justify="center" align="center">
          {CalenderList.map((calender, index) => {
            // Assuming calender.id is a unique identifier for each calender
            return (
              <Box m={4} key={calender.id}>
                <Animation
                  component={
                    <EventCard
                      gathering={false}
                      title={calender.title}
                      description={calender.description}
                      date={calender.date}
                      image={calender.image}
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

export default Calender;
