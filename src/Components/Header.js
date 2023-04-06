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

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.headerTitle}>
        <View style={styles.headerRule}>
          <HeaderBtnRule />
        </View>
        <Text style={styles.headerTitleText}>Yatzy Dice</Text>
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
    flexDirection: "row",
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
