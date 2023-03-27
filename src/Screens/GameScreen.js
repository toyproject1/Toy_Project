import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  Alert,
  Button,
  ToastAndroid,
} from "react-native";
import GHeader from "../Components/GHeader";
import PlayerNameplate from "../Components/PlayerNameplate";
import ScoreBoard from "../Components/ScoreBoard";
import DiceBox from "../Components/DcieBox";
import { io } from "socket.io-client";
import Toast from "react-native-simple-toast";

export default function GameScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalRankVisible, setModalRankVisible] = useState(false);
  const { gTitle, HCNum, Host, roomNumber, userId, userName } = route.params;
  const [userList, setUserList] = useState([]);
  const [rankList, setRankList] = useState([]);
  const WebSocket = useRef(null);

  console.log(gTitle, HCNum, roomNumber, userId, userName, Host);

  useEffect(() => {
    WebSocket.current = io("http://3.38.165.165:3131/");
    WebSocket.current.on("connect", () => {
      console.log("connected");
    });

    if (Host == "Host") {
      WebSocket.current.emit("hostCreateRoom", {
        userId: userId,
        userName: userName,
        roomNumber: roomNumber,
      });
    } else {
      // 일반유저 Host == 'User' 일 경우
      WebSocket.current.emit("joinRoom", {
        userId: userId,
        userName: userName,
        roomNumber: roomNumber,
      });
    }

    WebSocket.current.on("userJoinRoom", (data) => {
      console.log(data);
      Toast.showWithGravity(
        "유저님이 입장하였습니다.",
        Toast.LONG,
        Toast.BOTTOM
      );
    });

    WebSocket.current.on("refreshUserList", (data) => {
      // console.log(data);
      setUserList([]);
      const tempArr = [];
      data.userInfo.map((usermap) => {
        const tempList = {
          userName: usermap.userName,
          userState: usermap.userState,
          userRole: usermap.userRole,
        };
        tempArr.push(tempList);
      });
      setUserList((current) => {
        return tempArr;
      });
    });

    WebSocket.current.on("gameStart", (data) => {
      console.log(data);
      if (data.state === 1) {
        setModalVisible(!modalVisible);
      } else {
        Toast.showWithGravity(
          "아직 모든 유저들이 준비가 되지 않았습니다.",
          Toast.LONG,
          Toast.BOTTOM
        );
      }
    });

    WebSocket.current.on("disconnectHost", () => {
      Toast.showWithGravity(
        "호스트와의 연결이 끊어졌습니다.",
        Toast.LONG,
        Toast.BOTTOM
      );
      navigation.navigate("MainMenu");
    });

    WebSocket.current.on("gameEnd", (data) => {
      console.log(data);
      setModalRankVisible(!modalRankVisible);
      setRankList([]);
      const rankArr = [];
      data.userInfo.map((rankmap) => {
        const rankList = {
          userName: rankmap.userName,
          userScore: rankmap.userScore,
        };
        rankArr.push(rankList);
      });
      setUserList((current) => {
        return rankArr;
      });
    });

    WebSocket.current.on("changeHost", () => {
      WebSocket.current.emit("changeHost");
    });

    WebSocket.current.on("disconnectUser", (data) => {
      console.log(data);
      Toast.showWithGravity("유저가 나갔습니다.", Toast.LONG, Toast.BOTTOM);
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
                    <Text style={styles.roomnumber}>{roomNumber}</Text>
                  </View>
                  <View style={styles.roomlocation1}>
                    <Text style={styles.modalHeaderTitle}>{gTitle}</Text>
                  </View>
                  <View style={styles.roomlocation2}>
                    <Text style={styles.peopleCount}>
                      {userList.length}/{HCNum}
                    </Text>
                  </View>
                </View>
                {userList.map((list) => {
                  return (
                    <View style={styles.playerBox}>
                      <Text style={styles.player}>{list.userName}</Text>
                      <Text style={styles.player}>{list.userState}</Text>
                    </View>
                  );
                })}
                <View style={styles.btnOp}>
                  <Pressable
                    onPress={() => {
                      WebSocket.current.emit("gameReadyBtn");
                    }}
                  >
                    <Text style={styles.btnClose}>Ready</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      WebSocket.current.close();
                      navigation.navigate("MainMenu");
                    }}
                  >
                    <Text style={styles.btnSave}>Exit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View>
        <View style={styles.btnSite}>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalRankVisible}
            onRequestClose={() => {
              setModalRankVisible(!modalRankVisible);
            }}
          >
            <View style={styles.modalBG}>
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.rankHeader}>Ranking</Text>
                </View>
                {rankList.map((list) => {
                  return (
                    <View style={styles.playerBox}>
                      <Text style={styles.player}>{list.length}</Text>
                      <Text style={styles.player}>{list.userName}</Text>
                      <Text style={styles.player}>{list.userScore}</Text>
                    </View>
                  );
                })}
                <View style={styles.btnOp}>
                  <Pressable>
                    <Text style={styles.btnClose}></Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      WebSocket.current.close();
                      navigation.navigate("MainMenu");
                    }}
                  >
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
  rankHeader: {
    fontSize: 30,
    color: "#FFFFFF",
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
