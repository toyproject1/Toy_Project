import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function HeaderBtnOption() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue1, setSliderValue1] = useState(0);
  return (
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
            <View style={{ marginTop: 30 }}>
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
        style={styles.btn}
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>Option</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSite: {},
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
  btnCloseTop: {
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
  btnOp: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 160,
  },
});
