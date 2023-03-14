import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react"; // , { useContext }
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";
import SignUp from "./src/Screens/SignUp";
import Login from "./src/Screens/Login";
import Start from "./src/Screens/Start";
import MainMenu from "./src/Screens/MainMenu";
import HostGameMenu from "./src/Screens/HostGameMenu";
import Channel from "./src/Screens/Channel";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
