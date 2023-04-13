import React, { useState, useEffect } from "react"; // , useContext
import CustomInput from "../Components/Btns/CustomInput";
import { Text, StyleSheet, Pressable, View, Json, Alert } from "react-native";
import CustomButton from "../Components/Btns/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { Buffer } from "buffer";
import axios from "axios";

const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    let temp;

    try {
    } catch (e) {}
    await axios
      .post(`http://3.38.165.165:3000/api/signIn`, {
        user_email: Email,
        user_pw: password,
      })
      .then(async (response) => {
        temp = response.data;
        console.log(temp);
        access_token = response.data.access_token;
        console.log(access_token);
        refresh_token = response.data.refresh_token;
        console.log(refresh_token);

        await AsyncStorage.setItem("access_token", access_token);
        const ac_token = await AsyncStorage.getItem("access_token");
        console.log(ac_token);

        await AsyncStorage.setItem("refresh_token", refresh_token);
        const rf_token = await AsyncStorage.getItem("refresh_token");
        console.log(rf_token);

        const parts = temp.access_token
          .split(".")
          .map((part) =>
            Buffer.from(
              part.replace(/-/g, "+").replace(/_/g, "/"),
              "base64"
            ).toString()
          );
        const payload = parts[1];
        await AsyncStorage.setItem("userInfo", payload);
        console.log(payload);

        const userInfo = await AsyncStorage.getItem("userInfo");
        console.log(userInfo);
        userInfo["access_token"] = temp.access_token;
        userInfo["refresh_token"] = temp.refresh_token;
        navigation.reset({ routes: [{ name: "MainMenu" }] });

        Toast.showWithGravity(
          "로그인에 성공하였습니다.",
          Toast.SHORT,
          Toast.TOP
        );
      })
      .catch((err) => {
        console.log("err");
        Toast.showWithGravity(
          "이메일과 비밀번호가 일치하지 않습니다.",
          Toast.SHORT,
          Toast.TOP
        );
      });
  };

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
        type="email"
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
        <Pressable>
          <Text style={styles.choiceButtonText}>Login </Text>
        </Pressable>
        <Text style={styles.otherButtonText}>|</Text>
        <Pressable
          onPress={() => navigation.reset({ routes: [{ name: "SignUp" }] })}
        >
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
  choiceButtonText: {
    fontWeight: "500",
    fontSize: 15,
    color: "#000000",
    marginRight: 8,
    textDecorationLine: "underline",
  },
});
export default Login;