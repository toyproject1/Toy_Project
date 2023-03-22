import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react"; // , { useContext }
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

export default function App() {
  const [login, setLogin] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const userToken = async () => {
    console.log(JSON.parse(await AsyncStorage.getItem("userInfo")));
    const userLogin = JSON.parse(await AsyncStorage.getItem("userInfo"));
    if (userLogin !== null) {
      console.log("Login Success");
      setLogin(true);
    }
  };

  const [isLogin, setIsLogin] = useState(false);
  const getLogin = async () => {
    if ((await AsyncStorage.getItem("userInfo")) !== null) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getLogin();
  });
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {isLogin ? (
            <>
              <Stack.Screen
                name="AuthStack"
                component={AuthStack}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="AppStack"
                component={AppStack}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
