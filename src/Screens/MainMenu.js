import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Animated,
  Button,
} from "react-native";
import BtnOption from "../Components/Btns/BtnOption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import Dice from "../Components/Imgs/DiceNew03.png";
import { width, height } from "../globalStyles";
import { Audio } from "expo-av";

const MainMenu = ({ navigation }) => {
  const backAction = () => {
    // Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
    //   {
    //     text: "취소",
    //     onPress: () => null,
    //   },
    //   { text: "확인", onPress: () => BackHandler.exitApp() },
    // ]);
    // return true;
  };

  const backPress = () => {
    Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null,
      },
      {
        text: "확인",
        onPress: () => {
          if (navigation.routes[0].name === "MainMenu")
            return BackHandler.exitApp();
          else {
            navigation.goBack();
          }
        },
      },
    ]);
    return true;
  };
  const logout = async () => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null,
      },
      {
        text: "확인",
        onPress: async () => {
          await AsyncStorage.removeItem("userInfo");
          navigation.reset({ routes: [{ name: "Login" }] });
          // navigation.navigate("Login");
        },
      },
    ]);
  };

  const [sound, setSound] = useState();

  const pickSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    if(soundOption1.eftSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/pick.mp3"));
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(0.9);
    }
  };

  useEffect(() => {
    return ( sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined );
  }, [sound]);

  useEffect(() => {
    userData();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const userData = async () => {
    userName = JSON.parse(await AsyncStorage.getItem("userInfo")).user_name;
    userId = JSON.parse(await AsyncStorage.getItem("userInfo")).user_id;
    await AsyncStorage.getItem("userInfo");
    console.log(JSON.parse(await AsyncStorage.getItem("userInfo")));
    console.log(userName);
    console.log(userId);
  };
  
  // useEffect(() => {
  //   userData();
  // }, []);

  return (
    <View style={styles.main}>
      <Header />
      <View style={styles.image}>
        <Image source={Dice} />
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.btnshg}
          activeOpacity={0.9}
          onPress={() => {
            pickSound();
            navigation.navigate("HostGameMenu");
          }}
        >
          <Text style={styles.btnText}>Host Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnshg}
          activeOpacity={0.9}
          onPress={() => {
            pickSound();
            navigation.navigate("Channel");
          }}
        >
          <Text style={styles.btnText}>Join Game</Text>
        </TouchableOpacity>
        <BtnOption />
        <View style={styles.sBtns}>
          <TouchableOpacity
            style={styles.btnslg}
            activeOpacity={0.9}
            onPress={()=> {
              pickSound();
              logout();
            }}
          >
            <Text style={styles.btnText}>LogOut</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnExit}
            activeOpacity={0.9}
            onPress={() => {
              pickSound();
              Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
                {
                  text: "취소",
                  onPress: () => null,
                },
                { text: "확인", onPress: () => BackHandler.exitApp() },
              ]);
              return true;
            }}
          >
            <Text style={styles.btnText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fadeAnim: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    right: 30,
    bottom: 30,
    height: 30,
    width: 30,
  },
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  btns: {
    flex: 1,
    alignItems: "center",
  },
  sBtns: {
    flexDirection: "row",
  },
  mainhg: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
    alignItems: "center",
    justifyContent: "center",
  },
  btnshg: {
    width: 250,
    height: 60,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    marginTop: 15,
  },
  btnText: {
    fontSize: width * 26,
  },
  mainlg: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
    alignItems: "center",
    justifyContent: "center",
  },
  btnslg: {
    width: width * 115,
    height: height * 60,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    marginTop: 15,
    marginRight: 10,
  },
  btnExit: {
    width: width * 115,
    height: height * 60,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    marginTop: 15,
    marginLeft: 10,
  },
});

export default MainMenu;
