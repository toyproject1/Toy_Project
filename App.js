import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AppState } from "react-native";
import { Audio } from "expo-av";
import { useWindowDimensions } from "react-native";
import Bgm from "./assets/DreamingRain.mp3"

const Stack = createStackNavigator();

export default function App() {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(false);
  const getLogin = async () => {
    if ((await AsyncStorage.getItem("userInfo")) !== null) {
      setIsLogin(true);
    }
  };

  // try {
  //   console.log('asdadsadasdas')
  //   SoundPlayer.playSoundFile('DreamingRain', 'mp3')
  // } catch (error) {
  //   console.log(error);
  // }

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);
  
  const [sound, setSound] = useState();

  const BGM = async () => {
    const bgmState = JSON.parse(await AsyncStorage.getItem("bgm_state"));
    console.log("bgmState(App) : ", bgmState);
    const { sound } = await Audio.Sound.createAsync(Bgm);
    setSound(sound);
    await sound.playAsync();
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.3);
    await sound.setIsMutedAsync(bgmState === true ? false : true);
  };

  useEffect(() => {
    BGM();
    getLogin();
    const option = {
      bgcSound: true,
      eftSound: true,
    }
    AsyncStorage.getItem('option_state').then(r => {
      if(r=== null) {
        AsyncStorage.setItem("option_state", JSON.stringify(option)).then(r =>
          console.log('inputOption')
        );
      }
    })

    const appState = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current === "background") {
        console.log("앱이 백그라운드 상태임.");
      }
    });

    console.log("height : ", height);
    console.log("width : ", width);
    console.log("scale : ", scale);
    console.log("fontScale : ", fontScale);
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
