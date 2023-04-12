import React, {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import Bgm from "../../../assets/DreamingRain.mp3";
import { Audio } from "expo-av";
import AppContext from "../AppContext";

export default function HeaderBtnMy() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [Enabled, setEnabled] = useState(false);

  /*
  * 현준 추가
  // * */
  const myContext = useContext(AppContext);

  useEffect(() => {
    if(modalVisible) {
      AsyncStorage.getItem("option_state").then(r => {
        const data = JSON.parse(r);
        setIsEnabled(data.bgcSound)
        setEnabled(data.eftSound)
      });
    }
  }, [modalVisible]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
  };
  const toggleSwitch2 = () => setEnabled((previousState) => !previousState);

  /*
  * 옵션 AsyncStorage 저장
  * */
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

    myContext.setSetting1value(isEnabled);



    // console.log(option.bgcSound)
    // if (option.bgcSound === false) {
    //   sound.unloadAsync();
    //   console.log('unload')
    // } else {
    //   BGM();
    // }

  }

  const [sound, setSound] = useState();

  // const BGM = async () => {
  //   const { sound } = await Audio.Sound.createAsync(Bgm);
  //   setSound(sound);
  //   await sound.playAsync();
  //   await sound.setIsLoopingAsync(true);
  //   await sound.setVolumeAsync(0.3);
  // };
  //
  // useEffect(() => {
  //   AsyncStorage.getItem("option_state").then(r => {
  //     if(JSON.parse(r).bgcSound !== false){
  //       BGM();
  //     }
  //   });
  // },[]);



  // useEffect(() => {
  //   const option = {
  //     bgcSound: isEnabled,
  //     eftSound: Enabled,
  //   }
  //   AsyncStorage.setItem("option_state", JSON.stringify(option)).then(r =>
  //     console.log(isEnabled)
  //   );
  //
  //   AsyncStorage.getItem("option_state").then(r => {
  //     console.log('r= ',r);
  //   });
  //
  // }, [isEnabled, Enabled]);


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
                console.log('touch Save')
                }
              }>
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
    marginTop: 100,
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
    fontSize: 28,
  },
});