import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react"; // , { useContext }
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignUp from "./src/Screens/SignUp";
import Login from "./src/Screens/Login";
import Start from "./src/Screens/Start";
import MainMenu from "./src/Screens/MainMenu";
import HostGameMenu from "./src/Screens/HostGameMenu";
import Channel from "./src/Screens/Channel";
import { StatusBar } from "expo-status-bar";
import GameScreen from "./src/Screens/GameScreen";

const Stack = createStackNavigator();

export default function AppStack() {
  //   const [login, setLogin] = useState(true);
  //   const [isModalOpened, setIsModalOpened] = useState(false);
  //   const userToken = async () => {
  //     console.log(JSON.parse(await AsyncStorage.getItem("userInfo")));
  //     JSON.parse(await AsyncStorage.getItem("userInfo"));

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Start"
            component={Start}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
