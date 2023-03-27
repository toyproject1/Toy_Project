import React, { useState } from "react";
import CustomInput from "../Components/Btns/CustomInput";
import { Text, StyleSheet, Pressable, View, Alert } from "react-native";
import CustomButton from "../Components/Btns/CustomButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const onSignInPressed = async () => {
    Alert.alert(`${Username}, ${Email}, ${password}, ${password2}`);
    // const header = { Authorization: `Bearer ${access_token}` };
    // console.log(header);
    axios
      .post(`http://3.38.165.165:3000/api/signUp`, {
        user_name: Username,
        user_email: Email,
        user_pw: password,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(Username, Email));
      console.log(value);
    } catch (error) {
      console.log("error");
    }
    navigation.navigate("Start");
  };

  const onSignUpPressed = () => {
    console.warn("onSignUpPressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>Sign Up</Text>
      </View>
      <CustomInput
        value={Username}
        setValue={setUsername}
        placeholder="Username"
      />
      <CustomInput value={Email} setValue={setEmail} placeholder="Email" />

      <CustomInput
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <CustomInput
        value={password2}
        setValue={setPassword2}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <CustomButton onPress={onSignInPressed} text="Sign Up" />
      <View style={styles.otherButtonContainer}>
        <Pressable onPress={onSignUpPressed}>
          <Text style={styles.otherButtonText}> Sign Up</Text>
        </Pressable>
        <Text style={styles.otherButtonText}>|</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.otherButtonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8D98A",
  },
  signInTextContainer: {
    marginTop: "13%",
    marginLeft: "11%",
    marginBottom: 18,
  },
  signInText: {
    fontSize: 50,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 20,
  },
  otherButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 7,
  },
  otherButtonText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#000000",
    marginRight: 8,
  },
});
export default SignUp;
