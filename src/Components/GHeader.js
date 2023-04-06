import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HeaderBtnOption from "./Btns/HeaderBtnOption";

export default function GHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.headerRule}>
        <HeaderBtnOption />
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>Yatzy Dice</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
  },
  headerRule: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  headerMy: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
});
