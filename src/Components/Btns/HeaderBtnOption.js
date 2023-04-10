import React, {useEffect, useState} from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderBtnOption() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [Enabled, setEnabled] = useState(false);

  useEffect(() => {
    if(modalVisible) {
      AsyncStorage.getItem("option_state").then(r => {
        const data = JSON.parse(r);
        setIsEnabled(data.bgcSound)
        setEnabled(data.eftSound)
      });
    }
  }, [modalVisible])

  const saveOption = () => {
    const option = {
      bgcSound: isEnabled,
      eftSound: Enabled,
    }
    AsyncStorage.setItem("option_state", JSON.stringify(option)).then(r =>
      console.log(isEnabled)
    );

    AsyncStorage.getItem("option_state").then(r => {
      console.log('r= ',r);
    });
  }
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch2 = () => setEnabled((previousState) => !previousState);

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
            <View style={styles.container}>
              <View style={styles.position}>
                <Text style={styles.bgSound}>BackGround Sound</Text>
                <Switch
                  style={styles.bgsize}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View style={styles.position}>
                <Text style={styles.bgSound}>Sound Effect</Text>
                <Switch
                  style={styles.bgsize}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={Enabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={Enabled}
                />
              </View>
            </View>

            <View style={styles.btnOp}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnClose}>Close</Text>
              </Pressable>
              <Pressable onPress={() => {
                setModalVisible(!modalVisible)
                saveOption()
              }
              }>
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
  position: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  container: {
    width: "80%",
    alignItems: "center",
    marginTop: 60,
  },
  bgSound: {
    fontSize: 20,
    justifyContent: "flex-start",
  },
  bgsize: {
    justifyContent: "flex-end",
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
  btnCloseTop: {
    fontSize: 20,
    color: "#FFFFFF",
    marginRight: 15,
  },

  bgSd: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
    marginTop: 100,
  },
});