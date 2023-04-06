import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  // Dimensions,
  // useWindowDimensions,
} from "react-native";
import CustomButton from "../Components/Btns/CustomButton";
import images from "../../assets/Dice03.png";
// 앱을 들어왔을 때 첫 페이지
const Start = ({ navigation }) => {
  // const { height, width } = useWindowDimensions();
  // const windowWidth = Dimensions.get("window").width;
  // const windowHeight = Dimensions.get("window").height;
  // console.log(windowWidth);
  // console.log(windowHeight);
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
    alignItems: "center",
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
    height: 380,
    marginTop: 50,
  },
});

export default Start;
