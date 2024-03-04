import {
  Box,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

export const CartProductMeta = (props) => {
  const { price, image, name, description } = props;
  const IMAGE = require(`../images/${image}`);
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={IMAGE}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text color={mode("gray.600", "gray.400")} fontSize="sm" mr={2}>
            {description}
          </Text>
          <Text color="blue.600" fontSize="lg">
            {price} SR
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
