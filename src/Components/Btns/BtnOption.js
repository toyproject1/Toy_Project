import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function HeaderBtnMy() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [sliderValue1, setSliderValue1] = useState(100);
  return (
    <View style={styles.btnSite}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBG}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Option</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={styles.bgSound}>BackGround Sound</Text>
              <View style={styles.bgSd}>
                <Slider
                  value={sliderValue}
                  onValueChange={(e) => setSliderValue(e)}
                  style={{ width: 300, height: 30 }}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#17FFFF"
                  maximumTrackTintColor="#FFFFFF"
                  step={5}
                />
                <Text>{sliderValue}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.bgSound}>Sound Effect</Text>
              <View style={styles.bgSd}>
                <Slider
                  value={sliderValue1}
                  onValueChange={(e) => setSliderValue1(e)}
                  style={{ width: 300, height: 30 }}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#17FFFF"
                  maximumTrackTintColor="#FFFFFF"
                  step={5}
                />
                <Text>{sliderValue1}</Text>
              </View>
            </View>
            <View style={styles.btnOp}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnClose}>Close</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnSave}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.btns}
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnTextop}>Option</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSite: {},
  bgSd: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bgSound: {
    fontSize: 20,
    marginLeft: 60,
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
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
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
  },
  modalHeaderTitle: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  btnOp: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 160,
  },
  btnClose: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 30,
    marginTop: 15,
  },
  btnSave: {
    fontSize: 25,
    color: "#FFFFFF",
    marginRight: 30,
    marginTop: 15,
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
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
    alignItems: "center",
    justifyContent: "center",
  },
  btns: {
    width: 250,
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
    marginTop: 15,
  },
  btnTextop: {
    fontSize: 30,
  },
});
