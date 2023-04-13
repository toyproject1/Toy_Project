import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import ruleImg from "../Imgs/yatzy_rule.png";
import { height, width } from "../../globalStyles";

export default function GameBtnRule() {
  const [modalVisible, setModalVisible] = useState(false);

  const [sound, setSound] = useState();

  const pickSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    if(soundOption1.eftSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../../assets/pick.mp3"));
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(0.9);
    }
  };

  useEffect(() => {
    return ( sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined );
  }, [sound]);

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
              <Text style={styles.modalHeaderTitle}>Game Rule</Text>
              <Pressable onPress={() => {
                pickSound();
                setModalVisible(!modalVisible);
              }}>
                <Text style={styles.btnClose}>close</Text>
              </Pressable>
            </View>
            <View style={styles.gameRules}>
              <ScrollView
                persistentScrollbar={true}
                showsVerticalScrollIndicator={true}
              >
                <Text style={styles.ruleTxt}>
                  플레이어들은 5개의 주사위와 점수표를 가지고 게임을 시작합니다.
                </Text>
                <Text style={styles.ruleTxt}>
                  각 플레이어는 정해진 순서대로 자신의 턴에 주사위를 최대 3번
                  굴릴 수 있고 5개의 주사위 중 원하는 주사위를 킵해두고 나머지
                  주사위만을 다시 굴릴 수도 있습니다.
                </Text>
                <Text style={styles.ruleTxt}>
                  주사위를 굴려 원하는 조합이 나온다면 해당 조합의 점수를
                  점수판에 기록하고 턴을 넘깁니다.
                </Text>
                <Text style={styles.ruleTxt}>
                  각 플레이어들은 점수표를 모두 채울 때까지(13라운드) 플레이를
                  계속하며 모든 플레이어가 점수판을 채웠을 때 점수를 비교하여
                  순위가 결정되고 게임이 종료됩니다.
                </Text>
                <Text style={styles.ruleTxt}>주사위 점수 조합표</Text>
                <View>
                  <ScrollView
                    persistentScrollbar={true}
                    showsVerticalScrollIndicator={true}
                    horizontal={true}
                  >
                    <Image source={ruleImg} style={styles.ruleImg} />
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.9}
        onPress={() => {
          pickSound();
          setModalVisible(true);
        }}
      >
        <Text style={styles.btnText}>Rule</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    outline: "none",
    backgroundColor: "transparent",
  },
  btnText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  modalBG: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
  },
  modalCard: {
    flex: 0.8,
    alignItems: "center",
    width: "90%",
    height: "100%",
    backgroundColor: "#A8D98A",
  },
  modalHeaderTitleSite: {
    alignItems: "center",
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
  gameRules: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    margin: 20,
    overflow: "scroll",
  },
  ruleTxt: {
    fontSize: 18,
    marginBottom: 25,
    flexDirection: "column",
  },
  yatzy_rule: {
    width: width * 350,
    height: height * 350,
  },
  ruleImg: {
    width: width * 380,
    height: height * 368,
  },
});
