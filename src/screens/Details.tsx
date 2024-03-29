import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { Box, HStack, ScrollView, Text, useTheme, VStack } from "native-base";

import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { firestoreDateFormat } from "../utils/firestoreDateFormat";

import { Header } from "../components/Header";
import { Order } from "../components/OrderCard";
import { Loading } from "../components/Loading";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

type RouteParams = {
  orderId: string;
};

type OrderDetails = Order & {
  description: string;
  solution: string;
  closed: string;
};

export const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { orderId } = route.params as RouteParams;

  const handleOrderClose = () => {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informe a solução para encerrar a solicitação."
      );
    }

    setIsSubmiting(true);

    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação encerrada.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Solicitação", "Não foi possível encerrar a solicitação.");
      });
  };

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? firestoreDateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: firestoreDateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          ml={2}
          fontSize="sm"
          textTransform="uppercase"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              h={24}
              multiline
              textAlignVertical="top"
              placeholder="Descrição da solução"
              onChangeText={setSolution}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          isLoading={isSubmiting}
          text="Encerrar solicitação"
          m={5}
          onPress={handleOrderClose}
        />
      )}
    </VStack>
  );
};
