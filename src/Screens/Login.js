import React, { useState } from "react"; // , useContext
import CustomInput from "../Components/Btns/CustomInput";
import { Text, StyleSheet, Pressable, View } from "react-native";
import CustomButton from "../Components/Btns/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "./AuthContext";

const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const onLoginPressed = () => {
    console.warn("onLoginPressed");
  };

  const onSubmit = async () => {
    await AsyncStorage.setItem("token", Email);
    if (Email === "wlwhsxorhs@naver.com" && password === "1234") {
      console.warn("connect");
      navigation.navigate("MainMenu");
    } else {
      console.warn("not connect");
    }
  };

  const tokenlogin = async () => {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      navigation.navigate("MainMenu");
      console.warn("connect");
    } else {
      console.warn("not connect");
    }
  };

  tokenlogin();

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
