import React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import CustomButton from "../Components/Btns/CustomButton";
import images from "../../assets/Dice.png";

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images} />
      <View style={styles.signInTextContainer}></View>
      <CustomButton
        onPress={() => navigation.navigate("Login")}
        text="Login"
      ></CustomButton>
      <CustomButton
        onPress={() => navigation.navigate("SignUp")}
        text="Sign Up"
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8D98A",
  },
  signInTextContainer: {
    marginTop: "20%",
    marginLeft: "9%",
  },
  signInText: {
    fontSize: 50,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 40,
  },
  image: {
    width: "100%",
    height: 400,
  },
});

export default Start;
