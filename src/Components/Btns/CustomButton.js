import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "83%",
    height: 55,
    alignItems: "center",
    marginBottom: 25,
    borderRadius: 10,
    backgroundColor: "#E5EBFF",
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    color: "#545454",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default CustomButton;
