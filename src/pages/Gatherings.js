// Gatherings.js

import React, { useEffect, useState } from "react";
import Animation from "../components/Animation";
import GatheringCard from "../components/EventCard";
import { Flex, Box, Heading, Text, Stack } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useGathering } from "../contexts/GatheringContext";

function Gatherings() {
  const {
    gatherings,
    fetchGatherings,
    enroll,
    unenroll,
    fetchUserParticipations,
    userParticipations,
  } = useGathering();
  const { isAuth } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = (gatheringId) => {
    if (isAuth) {
      enroll(gatheringId);
      setIsEnrolled(true);
    } else {
      toast.error("Please Sign in to enroll!");
    }
  };

  const handleUnenroll = (gatheringId) => {
    if (isAuth) {
      unenroll(gatheringId);
      setIsEnrolled(false);
    } else {
      toast.error("Please Sign in to unenroll!");
    }
  };

  useEffect(() => {
    fetchGatherings();
    fetchUserParticipations();
  }, [isEnrolled]);

  return (
    <Stack spacing={8} align={"center"} py={{ base: 20, md: 28 }}>
            <Heading
        fontWeight={600}
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        lineHeight={"110%"}
        align={"center"}
        px={{ base: 4, md: 8, lg: 12 }}
      >
        Join The Coming{" "}
        <Text as={"span"} color={"blue.400"}>
          Gatherings!
        </Text>
      </Heading>
    <Flex direction="row" wrap="wrap" justify="center" align="center">
      {gatherings.map((gathering, index) => (
        <Box m={4} key={gathering.id}>
          <Animation
            component={
              <GatheringCard
                gathering={true}
                title={gathering.title}
                description={gathering.description}
                date={gathering.date}
                image={gathering.image}
                gatheringId={gathering.id}
                handleEnroll={() => handleEnroll(gathering.id)}
                handleUnenroll={() => handleUnenroll(gathering.id)}
                isEnrolled={userParticipations.some(
                  (p) => p.gatheringId === gathering.id
                )}
              />
            }
          />
        </Box>
      ))}
    </Flex>
    </Stack>
  );
}

export default Gatherings;
