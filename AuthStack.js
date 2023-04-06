import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react"; // , { useContext }
import MainMenu from "./src/Screens/MainMenu";
import HostGameMenu from "./src/Screens/HostGameMenu";
import Channel from "./src/Screens/Channel";
import { StatusBar } from "expo-status-bar";
import GameScreen from "./src/Screens/GameScreen";
import Login from "./src/Screens/Login";
import SignUp from "./src/Screens/SignUp";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="MainMenu"
            component={MainMenu}
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="HostGameMenu"
            component={HostGameMenu}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Channel"
            component={Channel}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GameScreen"
            component={GameScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
