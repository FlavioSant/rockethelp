import auth from "@react-native-firebase/auth";

import { useState } from "react";
import { Alert } from "react-native";
import { Envelope, Key } from "phosphor-react-native";
import { Heading, Icon, useTheme, VStack } from "native-base";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo_primary.svg";

export const SignIn = () => {
  const { colors } = useTheme();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    if (!fields.email || !fields.password) {
      return Alert.alert("Entrar", "Informe o E-mail e Senha.");
    }

    setIsSubmiting(true);

    auth()
      .signInWithEmailAndPassword(fields.email, fields.password)
      .catch((error) => {
        console.log(error);
        setIsSubmiting(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválido.");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "E-mail e/ou senha incorreto(s).");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "Usuário não cadastrado.");
        }

        return Alert.alert("Entrar", "Não foi possível acessar.");
      });
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
        value={fields.email}
        onChangeText={(text) => setFields({ ...fields, email: text })}
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
      <Button text="Entrar" onPress={handleSignIn} isLoading={isSubmiting} />
    </VStack>
  );
};
