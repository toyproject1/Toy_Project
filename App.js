import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AppState } from "react-native";
import { Audio } from "expo-av";
import Bgm from "./assets/DreamingRain.mp3";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const getLogin = async () => {
    if ((await AsyncStorage.getItem("userInfo")) !== null) {
      setIsLogin(true);
    }
  };

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);

  const [sound, setSound] = useState();

  // const BGM = async () => {
  //   const { sound } = await Audio.Sound.createAsync(Bgm);
  //   setSound(sound);
  //   await sound.playAsync();
  // };

  useEffect(() => {
    getLogin();
  });

  useEffect(() => {
    // BGM();
    const appState = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current === "background") {
        console.log("앱이 백그라운드 상태임.");
      }
    });
  }, []);

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
