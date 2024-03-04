import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useGathering } from "../contexts/GatheringContext";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";

export default function EventCard(props) {
  const IMAGE = require(`../images/${props.image}`);
  const { isAuth } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Center p={8}>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          w={{ base: "100%", sm: "1000px" }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "150%", sm: "300px" }}
            src={IMAGE}
            alt="Gathering Image"
          />

          <Stack>
            <CardBody>
              <Heading size="lg">{props.title}</Heading>

              <Text py="2">{props.description}</Text>
              {props.gathering && (
                <ParticipantsModal gatheringId={props.gatheringId} />
              )}
            </CardBody>
            <Divider />
            <CardFooter>
              <Flex
                justifyContent="space-between"
                alignItems="flex-end"
                width="100%"
                m={2}
              >
                <Box>
                  <Text color="blue.600" fontSize="md" mr={4}>
                    {format(new Date(props.date), "eeee, dd MMMM yyyy, h:mm a")}
                  </Text>
                </Box>
                <Box>
                  {props.gathering &&
                    (props.isEnrolled && isAuth ? (
                      <Stack>
                        <Text color="green.600" fontSize="md" mr={1}>
                          Enrolled <CheckIcon />
                        </Text>
                        <Button size="md" onClick={props.handleUnenroll}>
                          Cancel
                        </Button>
                      </Stack>
                    ) : (
                      <Button
                        colorScheme="blue"
                        size="md"
                        onClick={props.handleEnroll}
                      >
                        Enroll
                      </Button>
                    ))}
                </Box>
              </Flex>
            </CardFooter>
          </Stack>
        </Card>
      </Center>
    </motion.div>
  );
}

function ParticipantsModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fetchParticipants, participants } = useGathering();
  const handle = () => {
    fetchParticipants(props.gatheringId);
    onOpen();
  };
  return (
    <>
      <Button onClick={handle} size={"sm"}>
        See All Participants
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> See All {participants.length} Participants</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {participants.map((participant) => (
              <Text key={participant.id}>{participant.User.name}</Text>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
