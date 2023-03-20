import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react"; // , { useContext }
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  Alert,
  navigation,
  component,
  ToastAndroid,
  Share,
} from "react-native";
import SignUp from "./src/Screens/SignUp";
import Login from "./src/Screens/Login";
import Start from "./src/Screens/Start";
import MainMenu from "./src/Screens/MainMenu";
import HostGameMenu from "./src/Screens/HostGameMenu";
import Channel from "./src/Screens/Channel";
import { StatusBar } from "expo-status-bar";
import GameScreen from "./src/Screens/GameScreen";

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
      <NavigationContainer>
        <Stack.Navigator>
          {isLogin ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="MainMenu"
                component={MainMenu}
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
            </>
          ) : (
            <>
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
