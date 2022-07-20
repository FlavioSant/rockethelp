import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "../components/Loading";

import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
