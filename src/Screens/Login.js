import React, { useState, useEffect } from "react"; // , useContext
import CustomInput from "../Components/Btns/CustomInput";
import { Text, StyleSheet, Pressable, View, Json, Alert } from "react-native";
import CustomButton from "../Components/Btns/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";
import axios from "axios";
import restart from "./restart";

const Login = ({ navigation }) => {
  const onLoginPressed = () => {
    console.warn("onLoginPressed");
  };
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    console.log(Email);
    let temp;
    await axios
      .post(`http://3.38.165.165:3000/api/signIn`, {
        user_email: Email,
        user_pw: password,
      })
      .then(async (response) => {
        temp = response.data;
        console.log(response.data);
        const parts = temp.access_token
          .split(".")
          .map((part) =>
            Buffer.from(
              part.replace(/-/g, "+").replace(/_/g, "/"),
              "base64"
            ).toString()
          );
        const payload = parts[1];
        // console.log("JWT decode", payload);
        await AsyncStorage.setItem("userInfo", payload);
        console.log(payload);

        console.log(
          JSON.parse(await AsyncStorage.getItem("userInfo")).user_name
        );

        const userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
        userInfo["access_token"] = temp.access_token;
        userInfo["refresh_token"] = temp.refresh_token;
        console.log(userInfo);
        restart();
        //navigation.navigate("MainMenu");
        // navigation.replace("MainMenu");
      })
      .catch((err) => console.log(err));
  };

  // AsyncStorage.setItem(
  //   "userData",
  //   JSON.stringify({
  //     user_email: Email,
  //     user_pw: password,
  //   })
  // );

  // const userData = async () => {
  //   Alert.alert(`${Email}, ${password}`);
  //   //await AsyncStorage.setItem("token", Email);
  //   let temp;
  //   await axios
  //     .post(`http://43.200.253.133:3000/api/signIn`, {
  //       user_email: Email,
  //       user_pw: password,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       temp = response.data;
  //     })
  //     .catch((err) => console.log(err));
  //   console.log(temp);

  //   const value = await AsyncStorage.getItem("userData");
  //   if (value !== null) {
  //     navigation.navigate("MainMenu");

  //     console.warn("connect");
  //   } else {
  //     console.warn("not connect");
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.signInTextContainer}>
        <Text style={styles.signInText}>Login</Text>
        <Text style={styles.signInTextS}>서비스 이용을 위해</Text>
        <Text style={styles.signInTextS2}>로그인이 필요합니다.</Text>
      </View>
      <CustomInput
        onChangeText={(value) => setEmail(value)}
        value={Email}
        setValue={setEmail}
        placeholder="Email"
      />
      <CustomInput
        value={password}
        onChangeText={(value) => setPassword(value)}
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <CustomButton onPress={onSubmit} text="Sign In" />
      <View style={styles.otherButtonContainer}>
        <Pressable onPress={onLoginPressed}>
          <Text style={styles.otherButtonText}>Login </Text>
        </Pressable>
        <Text style={styles.otherButtonText}>|</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.otherButtonText}> Sign Up</Text>
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
    marginTop: "21%",
    marginLeft: "9%",
  },
  signInText: {
    fontSize: 50,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 10,
  },
  signInTextS: {
    fontSize: 17,
    fontWeight: "300",
    marginTop: 5,
    color: "#000000",
  },
  signInTextS2: {
    fontSize: 17,
    fontWeight: "300",
    marginTop: 5,
    color: "#000000",
    marginBottom: 50,
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
export default Login;
