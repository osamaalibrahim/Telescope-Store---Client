import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";

function FormControlWithLeftIcon(props) {
  return (
    <div>
      <FormControl isRequired>
        <FormLabel size="sm">{props.label}</FormLabel>
        <InputGroup size="sm">
          <InputLeftElement>
            <Icon as={props.icon} color="gray.300" />
          </InputLeftElement>
          <Input
            type={props.type}
            borderColor="#d8dee4"
            size="sm"
            borderRadius="6px"
            value={props.value}
            onChange={props.onChange}
          />
        </InputGroup>
      </FormControl>
    </div>
  );
}

export default FormControlWithLeftIcon;
