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
import AppContext from "./src/Components/AppContext";
import Bgm from "./assets/DreamingRain.mp3";
// import Bgm from "./assets/DreamingRain.mp3";

const Stack = createStackNavigator();

export default function App() {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const [isLogin, setIsLogin] = useState(false);
  const getLogin = async () => {
    if ((await AsyncStorage.getItem("userInfo")) !== null) {
      setIsLogin(true);
    }
  };

  /*
  * 현준 추가
  * */
  const [setting1value, setSetting1value] = useState(false);
  const [setting2value, setSetting2value] = useState(false);



  const toggleSetting2 = () => {
    setting3 ? setSetting2(true) : setSetting2value(false);
  };

  const userSettings = {
    setting1name: setting1value,
    setting2name: setting2value,
    setSetting1value,
    toggleSetting2,
  };


  useEffect(() => {
    if(setting1value === true) {
      console.log(' ==> ',setting1value)
      sound.playAsync();

    }else {
      console.log(' ==> ',setting1value)
      try {
        sound.pauseAsync()
      }catch (e) {
        
      }

    }
  },[setting1value])

  /*
  * bgm 메서드
  * */
  const [sound, setSound] = React.useState();

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(Bgm)
    await setSound(sound);
    await sound.setIsLoopingAsync(true);
    await sound.setVolumeAsync(0.3);
    return sound
  }

  useEffect(() => {
    playSound().then(r => {
      console.log('sound -> ',r)
      AsyncStorage.getItem("option_state").then(data => {
        if(JSON.parse(data).bgcSound !== false){
          setSetting1value(JSON.parse(data).bgcSound);
        }
      });
    })


  },[]);

  //****


  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);

  useEffect(() => {
    getLogin();
    // BGM();
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
      <AppContext.Provider value={userSettings}>
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
      </AppContext.Provider>
    </>
  );
}