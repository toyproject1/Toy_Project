import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BtnCntUp() {
  const [HeadCount, setHeadCount] = useState(2);
  return (
    <View>
      <Text>{HeadCount}</Text>
      <Pressable onPress={() => setHeadCount(HeadCount + 1)}>
        <TouchableOpacity style={Styles.btn} activeOpacity={0.8}>
          <Text>▲</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  btn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
});
