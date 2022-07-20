import { useState } from "react";
import { VStack } from "native-base";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";

export const Register = () => {
  const navigation = useNavigation();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [fields, setFields] = useState({
    patrimony: "",
    description: "",
  });

  const handleNewOrderRegister = () => {
    if (!fields.patrimony || !fields.description) {
      return Alert.alert("Nova Solicitação", "Preencha todos os campos.");
    }

    setIsSubmiting(true);

    firestore()
      .collection("orders")
      .add({
        patrimony: fields.patrimony,
        description: fields.description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação cadastrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);

        Alert.alert(
          "Solicitação",
          "Não foi possível cadastrar nova solicitação."
        );
      });
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova Solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        value={fields.patrimony}
        onChangeText={(text) => setFields({ ...fields, patrimony: text })}
      />

      <Input
        placeholder="Descrição do problema"
        mt={5}
        flex={1}
        multiline
        textAlignVertical="top"
        value={fields.description}
        onChangeText={(text) => setFields({ ...fields, description: text })}
      />

      <Button
        isLoading={isSubmiting}
        onPress={handleNewOrderRegister}
        text="Cadastrar"
        mt={5}
      />
    </VStack>
  );
};
