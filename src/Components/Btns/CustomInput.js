import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    width: "83%",
    height: 55,
    paddingLeft: 15,
    borderRadius: 10,
    marginBottom: 46,
    alignSelf: "center",
  },
});

export default CustomInput;
