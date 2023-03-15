import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import GHeader from "../Components/GHeader";

export default function GameScreen() {
  return (
    <View style={styles.main}>
      <GHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#A8D98A",
  },
});
