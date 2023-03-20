import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BtnMainMenu() {
  return (
    <TouchableOpacity
      style={styles.btn}
      activeOpacity={0.9}
      onPress={() => <></>}
    >
      <Text style={styles.btnTxt}>Main Menu</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
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
  },
  btnTxt: {
    fontSize: 18,
  },
});
