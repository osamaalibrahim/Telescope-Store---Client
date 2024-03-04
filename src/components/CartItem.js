import {
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { CartProductMeta } from "./CartProductMeta";

export const CartItem = (props) => {
  const {
    name,
    description,
    quantity,
    image,
    price,
    onChangeQuantity,
    onClickDelete,
  } = props;

  const QuantitySelect = ({ value, onChange, onChangeQuantity, ...props }) => {
    return (
      <NumberInput
        maxW="70px"
        value={value}
        onChange={(_, value) => onChange && onChange(value)}
        min={1}
        max={10}
        aria-label="Select quantity"
        {...props}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    );
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={image}
        price={price}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: "none", md: "flex" }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(value) => {
            onChangeQuantity?.(value);
          }}
        />

        <IconButton
          icon={<DeleteIcon />}
          aria-label={`Delete ${name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="flex-end"
        display={{ base: "flex", md: "none" }}
      >
        <IconButton fontSize="sm" m={1}>
          <DeleteIcon
            aria-label={`Delete ${name} from cart`}
            onClick={onClickDelete}
          />
        </IconButton>
        <QuantitySelect
          value={quantity}
          onChange={(value) => {
            onChangeQuantity?.(value);
          }}
        />
      </Flex>
    </Flex>
  );
};
