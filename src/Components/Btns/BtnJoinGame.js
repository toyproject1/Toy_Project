import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BtnJoinGame() {
  return (
    <TouchableOpacity
      style={styles.btns}
      activeOpacity={0.9}
      onPress={() => <></>}
    >
      <Text style={styles.btnText}>Join Game</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
    alignItems: "center",
    justifyContent: "center",
  },
  btns: {
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
    fontSize: 30,
  },
});
