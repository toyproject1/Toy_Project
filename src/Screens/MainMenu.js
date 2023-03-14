import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import BtnJoinGame from "../Components/Btns/BtnJoinGame";
import BtnOption from "../Components/Btns/BtnOption";
import BtnLogOut from "../Components/Btns/BtnLogOut";
import BtnExit from "../Components/Btns/BtnExit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import Dice from "../Components/Imgs/Dice111.png";

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

const MainMenu = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

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
          onPress={() => navigation.navigate("HostGameMenu")}
        >
          <Text style={styles.btnTexthg}>Host Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnshg}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Channel")}
        >
          <Text style={styles.btnTexthg}>Join Game</Text>
        </TouchableOpacity>
        <BtnOption />
        <View style={styles.sBtns}>
          <TouchableOpacity
            style={styles.btnslg}
            activeOpacity={0.9}
            onPress={logout}
          >
            <Text style={styles.btnTextlg}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnExit}
            activeOpacity={0.9}
            onPress={backAction}
          >
            <Text style={styles.btnTextlg}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
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
  btnTexthg: {
    fontSize: 30,
  },
  mainlg: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
    alignItems: "center",
    justifyContent: "center",
  },
  btnslg: {
    width: 115,
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
    marginRight: 10,
  },
  btnExit: {
    width: 115,
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
    marginLeft: 10,
  },
  btnTextlg: {
    fontSize: 30,
  },
});

export default MainMenu;
