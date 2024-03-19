import React from "react";
import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Avatar,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import osama from "../images/osama.jpg";
import omar from "../images/omar.jpg";
import Mohammed from "../images/Mohammed.jpg";
import rayyan from "../images/rayyan.jpg";
import sohaib from "../images/sohaib.jpg";

function About() {
  const listOfAvatars = [
    {
      id: 1,
      name: "Osama Alibrahim",
      image: osama,
    },
    {
      id: 2,
      name: "Omar Alomran",
      image: omar,
    },
    {
      id: 3,
      name: "Sohaib Aledlah",
      image: sohaib,
    },
    {
      id: 4,
      name: "Rayyan Alsuhaibani",
      image: rayyan,
    },
    {
      id: 5,
      name: "Mohammed Alsedais",
      image: Mohammed,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial animation values
      animate={{ opacity: 1, y: 0 }} // Animation to apply when component is mounted
      transition={{ duration: 1 }} // Animation duration
    >
      <Stack
        bg={useColorModeValue("gray.50", "gray.900")}
        py={{ base: 20, md: 28 }}
        px={8}
        spacing={{ base: 8, md: 10 }}
        align={"center"}
        direction={"column"}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontFamily="Serif"
          textAlign={"center"}
          maxW={"3xl"}
        >
          We believe the wonders of the universe should be within reach for
          everyone, everywhere. With our exportly curated selection of
          telescopes and our dedication to dymistifiying astronomy, we are here
          to guide you from your first glance through a lens to your lifelong
          journey among the stars.
        </Text>
        <Heading
          fontWeight={600}
          fontSize={{ base: "5xl", sm: "5xl", md: "6xl" }}
          fontFamily="Serif"
          lineHeight={"110%"}
          align={"center"}
        >
          Meet Our{" "}
          <Text as={"span"} color={"blue.400"}>
            Team!
          </Text>
        </Heading>
        <Flex direction="row" wrap="wrap" justify="center" align="center" p={4}>
          {listOfAvatars.map((avatar) => (
            <AvatarBox
              key={avatar.id}
              name={avatar.name}
              image={avatar.image}
            />
          ))}
        </Flex>
      </Stack>
    </motion.div>
  );
}

function AvatarBox({ name, image }) {
  return (
    <Box textAlign={"center"} p={10}>
      <Avatar src={image} mb={2} size={"2xl"} />

      <Heading fontSize={"xl"} fontWeight={700} fontFamily="Serif">
        {name}
      </Heading>
    </Box>
  );
}

export default About;
