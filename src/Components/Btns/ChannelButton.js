import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, text1 }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text1}>{text1}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "75%",
    height: 85,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#815E06",
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 25,
  },
  text1: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default CustomButton;
