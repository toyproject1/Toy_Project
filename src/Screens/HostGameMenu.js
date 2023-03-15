import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import BtnMainMenu from "../Components/Btns/BtnMainMenu";
import Header from "../Components/Header";

export default function HostGameMenu({ navigation }) {
  const [gTitle, onChangeGTitle] = React.useState("");
  const [HCNum, onChangeHCNum] = React.useState(2);
  const [gameInfo, setGInfo] = React.useState({
    gTitle: { gTitle },
    headCount: { HCNum },
  });

  return (
    <View style={styles.main}>
      <Header />
      <View>
        <View style={styles.container}>
          <View style={styles.txts}>
            <Text style={styles.txtGTitle}>Game Title</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeGTitle}
            value={gTitle}
          />
          <View style={styles.headCountContain}>
            <View style={styles.HeadCountTxt}>
              <Text style={styles.txtGTitle}>Head Count</Text>
              <View style={styles.HDCForm}>
                <View style={styles.inputHC}>
                  <Text style={styles.hCTxt}>{HCNum}</Text>
                </View>
                <View style={styles.upDownBtns}>
                  <Pressable
                    onPress={() => onChangeHCNum(HCNum < 4 ? HCNum + 1 : HCNum)}
                  >
                    <Text style={styles.btnUpDown}>▲</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => onChangeHCNum(HCNum > 2 ? HCNum - 1 : HCNum)}
                  >
                    <Text style={styles.btnUpDown}>▼</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.btns}>
            <Pressable style={styles.btnCG}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("GameScreen")}
              >
                <Text style={styles.btnTxt}>Create Game</Text>
              </TouchableOpacity>
            </Pressable>
            <View style={styles.btnMM}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("MainMenu")}
                // onPress={navigation.goBack}
              >
                <Text style={styles.btnTxt}>Main Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
  },
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "35%",
  },
  headCountContain: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  txts: {
    width: "80%",
  },
  txtGTitle: {
    marginTop: 5,
    fontSize: 20,
  },
  input: {
    marginTop: 5,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(200, 250, 200, 0.5)",
    borderWidth: 0,
    fontSize: 20,
  },

  btn: {
    width: 115,
    height: 60,
    borderRadius: 15,
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
  btnTxt: {
    fontSize: 18,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 100,
  },
  btnCG: {
    marginRight: 15,
  },
  btnMM: {
    marginLeft: 15,
  },
  HeadCountTxt: {
    width: "100%",
    alignItems: "flex-start",
  },
  HDCForm: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputHC: {
    marginTop: 5,
    marginBottom: 10,
    width: "80%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(200, 250, 200, 0.5)",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  hCTxt: {
    fontSize: 20,
  },
  upDownBtns: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  btnUpDown: {
    fontSize: 30,
    marginRight: 10,
  },
});
