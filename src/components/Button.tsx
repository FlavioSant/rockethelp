import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base";

type ButtonProps = IButtonProps & {
  text: string;
};

export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{
        bg: "green.500",
      }}
      w="full"
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {text}
      </Heading>
    </ButtonNativeBase>
  );
};
