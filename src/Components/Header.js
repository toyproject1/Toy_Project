import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
} from "react-native";
import HeaderBtnRule from "./Btns/HeaderBtnRule";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  // const [name, setName] = useState(AsyncStorage.getItem("userData"));
  const name = AsyncStorage.getItem("userInfo").user_name;
  const onClick = async () => {
    JSON.parse(await AsyncStorage.getItem("userData"));
  };

  const userData = async () => {
    JSON.stringify(await AsyncStorage.getItem("userInfo"));
    value = JSON.parse(await AsyncStorage.getItem("userInfo")).user_name;
  };

  useEffect(() => {
    userData();
    //   name();
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerRule}>
        <HeaderBtnRule />
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>Yatzy Dice</Text>
      </View>
      <View style={styles.headerMy}>
        <View style={styles.btnSite}>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalBG}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderTitle}>My Profile</Text>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.btnClose}>close</Text>
                  </Pressable>
                </View>
                {/* {value} */}
                <View style={styles.profileContents}>
                  <Text style={styles.profileTexts}>Your Name : </Text>
                  <Text style={styles.profileTexts}>Win :</Text>
                  <Text style={styles.profileTexts}>Lose :</Text>
                  <Text style={styles.profileTexts}>Win Rate :</Text>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnText}>My</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
  },
  headerRule: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  headerMy: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  btn: {
    outline: "none",
    backgroundColor: "transparent",
  },
  btnText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  modalBG: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    flex: 0.8,
    alignItems: "center",
    width: "90%",
    backgroundColor: "#A8D98A",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
  },
  modalHeaderTitle: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  btnClose: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 15,
  },
  profileContents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileTexts: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
});
