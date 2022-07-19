import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const SignIn = () => {
  const { colors } = useTheme();
  const [fields, setFields] = useState({
    name: "",
    password: "",
  });

  const handleSignIn = () => {
    console.log(fields);
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        keyboardType="email-address"
        value={fields.name}
        onChangeText={(text) => setFields({ ...fields, name: text })}
        InputLeftElement={
          <Icon as={<Envelope size={24} color={colors.gray[300]} />} ml={4} />
        }
      />
      <Input
        mb={8}
        secureTextEntry
        placeholder="Senha"
        value={fields.password}
        onChangeText={(text) => setFields({ ...fields, password: text })}
        InputLeftElement={
          <Icon as={<Key size={24} color={colors.gray[300]} />} ml={4} />
        }
      />
      <Button text="Entrar" onPress={handleSignIn} />
    </VStack>
  );
};
