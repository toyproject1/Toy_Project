import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BtnExit() {
  return (
    <TouchableOpacity
      style={styles.btns}
      activeOpacity={0.9}
      onPress={() => <></>}
    >
      <Text style={styles.btnText}>Exit</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btns: {
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
  btnText: {
    fontSize: 30,
  },
});
