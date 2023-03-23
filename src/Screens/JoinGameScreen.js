import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Modal, Pressable } from "react-native";
import GHeader from "../Components/GHeader";
import PlayerNameplate from "../Components/PlayerNameplate";
import ScoreBoard from "../Components/ScoreBoard";
import DiceBox from "../Components/DcieBox";
import { io } from "socket.io-client";

export default function GameScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [roomnumber, setRoomnumber] = useState("001");
  const [plCount, setPlCount] = useState(1);
  const [player, setPlayer] = useState("User Name");
  const [ready, setReady] = useState("Wait ...");

  const WebSocket = useRef(null);

  useEffect(async () => {
    WebSocket.current = io("http://3.38.165.165:3131/");
    WebSocket.current.on("connect", () => {
      console.log("connected");
    });
  }, []);
  return (
    <View style={styles.main}>
      <GHeader />
      <View style={styles.PNameplatesSite}>
        <PlayerNameplate />
      </View>
      <View style={styles.sBoardSite}>
        <ScoreBoard />
      </View>
      <View style={styles.diceBoxSite}>
        <DiceBox />
      </View>
      <View style={styles.btnRollSite}>
        <></>
      </View>
      <View>
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
                  <View style={styles.roomlocation}>
                    <Text style={styles.roomnumber}>{roomnumber}</Text>
                  </View>
                  <View style={styles.roomlocation1}>
                    <Text style={styles.modalHeaderTitle}></Text>
                  </View>
                  <View style={styles.roomlocation2}>
                    <Text style={styles.peopleCount}>{plCount}/4</Text>
                  </View>
                </View>
                <View style={styles.playerBox}>
                  <Text style={styles.player}>{player}</Text>
                  <Text style={styles.player}>{ready}</Text>
                </View>
                <View style={styles.playerBox}>
                  <Text style={styles.player}>{player}</Text>
                  <Text style={styles.player}>{ready}</Text>
                </View>
                <View style={styles.playerBox}>
                  <Text style={styles.player}>{player}</Text>
                  <Text style={styles.player}>{ready}</Text>
                </View>
                <View style={styles.playerBox}>
                  <Text style={styles.player}>{player}</Text>
                  <Text style={styles.player}>{ready}</Text>
                </View>
                <View style={styles.btnOp}>
                  <Pressable onPress={() => setReady(true)}>
                    <Text style={styles.btnClose}>Ready</Text>
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate("MainMenu")}>
                    <Text style={styles.btnSave}>Exit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
    alignItems: "center",
  },
  PNameplatesSite: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  sBoardSite: {
    width: "90%",
  },
  diceBoxSite: {
    width: "95%",
    alignItems: "center",
  },
  main2: {
    flex: 1,
    backgroundColor: "#A8D98A",
  },
  playerBox: {
    width: 300,
    height: 60,
    borderRadius: 15,
    shadowColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 30,
  },
  player: {
    fontSize: 20,
    marginRight: 30,
    marginLeft: 30,
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
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  roomlocation: {
    justifyContent: "center",
  },
  roomlocation1: {
    justifyContent: "center",
  },
  roomlocation2: {
    justifyContent: "flex-end",
  },
  roomnumber: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 15,
    marginRight: 35,
  },
  modalHeaderTitle: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 15,
    marginRight: 15,
  },
  peopleCount: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 35,
    marginRight: 15,
  },
  btnOp: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
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
