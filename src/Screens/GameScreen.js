import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import GHeader from "../Components/GHeader";
import PlayerNameplate from "../Components/PlayerNameplate";
import ScoreBoard from "../Components/ScoreBoard";
import { io } from "socket.io-client";
import Dice1 from "../Components/Imgs/Dice01.png";
import Dice2 from "../Components/Imgs/Dice02.png";
import Dice3 from "../Components/Imgs/Dice03.png";
import Dice4 from "../Components/Imgs/Dice04.png";
import Dice5 from "../Components/Imgs/Dice05.png";
import Dice6 from "../Components/Imgs/Dice06.png";
import Toast from "react-native-simple-toast";
import { array } from "prop-types";

export default function GameScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalRankVisible, setModalRankVisible] = useState(false);
  // const [roomnumber, setRoomnumber] = useState("001");
  const [plCount, setPlCount] = useState(1);
  // const [player, setPlayer] = useState("User Name");
  const [rollChance, setChanceCount] = useState(2);
  // const [ready, setReady] = useState("Wait ...");
  const { gTitle, HCNum, Host, roomNumber, userId, userName } = route.params;
  const [abc, setAbc] = useState("0");
  const [abcd, setAbcd] = useState("1");
  const [abcde, setAbcde] = useState("2");
  const [userList, setUserList] = useState([]);
  const [scoreList, setScoreList] = useState([]);

  const WebSocket = useRef(null);
  //console.log(gTitle, HCNum, roomNumber, userId, userName, Host);

  let [turn, setTurn] = useState();

  // Roll버튼 클릭시 랜덤 주사위 굴리기(굴렸을 때 나오는 주사위)
  let [rolledDice01, setRolledDice01] = useState();
  let [rolledDice02, setRolledDice02] = useState();
  let [rolledDice03, setRolledDice03] = useState();
  let [rolledDice04, setRolledDice04] = useState();
  let [rolledDice05, setRolledDice05] = useState();

  const [putD01, setPutD01] = useState(false);
  const [putD02, setPutD02] = useState(false);
  const [putD03, setPutD03] = useState(false);
  const [putD04, setPutD04] = useState(false);
  const [putD05, setPutD05] = useState(false);

  const [rankList, setRankList] = useState([]);

  let [temp, setTemp] = useState({});

  let dIndex = [];
  let [DIndex, setDIndex] = useState([]);

  let [DiceResult, setDiceResult] = useState({});
  let [userScore, setUserScore] = useState(false);
  let [Picked, setPicked] = useState([]);
  let [ScoreValue, setScoreValue] = useState({});
  let [State, setState] = useState(null);

  useEffect(() => {
    WebSocket.current = io("http://3.38.165.165:3131/");
    WebSocket.current.on("connect", () => {
      console.log("connected");
    });

    // userData();

    if (Host == "Host") {
      WebSocket.current.emit("hostCreateRoom", {
        userId: userId,
        userName: userName,
        roomNumber: roomNumber,
      });
    } else {
      // 일반유저 Host == 'User' 일 경우
      console.log(
        "========================joinUser ==============================="
      );
      console.log(userId, userName, roomNumber);
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
        Toast.SHORT,
        Toast.BOTTOM
      );
    });

    WebSocket.current.on("joinError", () => {
      console.log("참여 제한");
      Toast.showWithGravity("방이 꽉 찼습니다.", Toast.SHORT, Toast.BOTTOM);
      navigation.reset({ routes: [{ name: "Channel" }] });
    });

    WebSocket.current.on("refreshUserList", (data) => {
      console.log(data);
      setUserList([]);
      const tempArr = [];
      data.userInfo.map((usermap) => {
        const tempList = {
          userId: usermap.userId,
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

    WebSocket.current.on("userScoreInfo", (data) => {
      console.log(data);
      console.log(data[0].userName);
      console.log(data[0].userScore);
      setScoreList([]);
      const scoreArr = [];
      data.map((scoremap) => {
        const tempScore = {
          userName: scoremap.userName,
          userScore: scoremap.userScore,
        };
        scoreArr.push(tempScore);
      });
      setScoreList((current) => {
        setUserScore(true);
        return scoreArr;
      });
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

    WebSocket.current.on("gameStart", (data) => {
      console.log(data);
      if (data.state === 1) {
        setModalVisible(!modalVisible);
      } else {
        Toast.showWithGravity(
          "아직 모든 유저들이 준비가 되지 않았습니다.",
          Toast.SHORT,
          Toast.BOTTOM
        );
      }
    });

    WebSocket.current.on("error", (data) => {
      console.log(data.message);
    });

    WebSocket.current.on("disconnectHost", () => {
      Toast.showWithGravity(
        "호스트의 연결이 끊어졌습니다.",
        Toast.SHORT,
        Toast.BOTTOM
      );
      // navigation.navigate("MainMenu");
    });

    WebSocket.current.on("disconnectUser", (data) => {
      console.log(data);
      Toast.showWithGravity("유저가 나갔습니다.", Toast.SHORT, Toast.BOTTOM);
    });

    WebSocket.current.on("changeHost", () => {
      WebSocket.current.emit("changeHost");
    });

    WebSocket.current.on("diceTurn", (data) => {
      console.log("주사위 굴릴 사람 : ", data.diceTurn);
      setTurn(data.diceTurn);
    });

    WebSocket.current.on("throwDice", (data) => {
      console.log(data);
      if (data.state === 0) {
        Toast.showWithGravity(`${data.message}`, Toast.SHORT, Toast.BOTTOM);
      } else {
        console.log(data.diceResult.message);
        setTemp({
          dice01: data.diceResult.firstDice,
          dice02: data.diceResult.secDice,
          dice03: data.diceResult.trdDice,
          dice04: data.diceResult.fothDice,
          dice05: data.diceResult.fithDice,
        });
        setDiceResult(data.diceResult);
        setPicked(data.scoreBoard.picked);
        setScoreValue({
          Ones: data.scoreBoard.scoreValue.ones,
          Twos: data.scoreBoard.scoreValue.twos,
          Threes: data.scoreBoard.scoreValue.threes,
          Fours: data.scoreBoard.scoreValue.fours,
          Fives: data.scoreBoard.scoreValue.fives,
          Sixes: data.scoreBoard.scoreValue.sixes,
          Bonus: data.scoreBoard.scoreValue.bonus,
          Triple: data.scoreBoard.scoreValue.triple,
          Four_card: data.scoreBoard.scoreValue.four_card,
          Full_house: data.scoreBoard.scoreValue.full_house,
          Small_straight: data.scoreBoard.scoreValue.small_straight,
          Large_straight: data.scoreBoard.scoreValue.large_straight,
          Yahtzee: data.scoreBoard.scoreValue.yahtzee,
          Chance: data.scoreBoard.scoreValue.chance,
        });
        setState(data.scoreBoard.state);
      }
    });

    WebSocket.current.on("putDice", (data) => {
      console.log(data);
      if (data.state === 0) {
        Toast.showWithGravity(`${data.message}`, Toast.SHORT, Toast.BOTTOM);
      } else {
        setTemp({
          dice01: data.diceResult.firstDice,
          dice02: data.diceResult.secDice,
          dice03: data.diceResult.trdDice,
          dice04: data.diceResult.fothDice,
          dice05: data.diceResult.fithDice,
        });
        setDiceResult(data.diceResult);
        setPicked(data.scoreBoard.picked);
        setScoreValue({
          Ones: data.scoreBoard.scoreValue.ones,
          Twos: data.scoreBoard.scoreValue.twos,
          Threes: data.scoreBoard.scoreValue.threes,
          Fours: data.scoreBoard.scoreValue.fours,
          Fives: data.scoreBoard.scoreValue.fives,
          Sixes: data.scoreBoard.scoreValue.sixes,
          Bonus: data.scoreBoard.scoreValue.bonus,
          Triple: data.scoreBoard.scoreValue.triple,
          Four_card: data.scoreBoard.scoreValue.four_card,
          Full_house: data.scoreBoard.scoreValue.full_house,
          Small_straight: data.scoreBoard.scoreValue.small_straight,
          Large_straight: data.scoreBoard.scoreValue.large_straight,
          Yahtzee: data.scoreBoard.scoreValue.yahtzee,
          Chance: data.scoreBoard.scoreValue.chance,
        });
        setState(data.scoreBoard.state);
      }
    });
  }, []);

  useEffect(() => {
    console.log("==================================");
    console.log(typeof temp.dice01);
    console.log("dice01 :" + temp.dice01);
    console.log("dice02 :" + temp.dice02);
    console.log("dice03 :" + temp.dice03);
    console.log("dice04 :" + temp.dice04);
    console.log("dice05 :" + temp.dice05);
    console.log("==================================");
    switch (temp.dice01) {
      case 1:
        setRolledDice01(Dice1);
        break;
      case 2:
        setRolledDice01(Dice2);
        break;
      case 3:
        setRolledDice01(Dice3);
        break;
      case 4:
        setRolledDice01(Dice4);
        break;
      case 5:
        setRolledDice01(Dice5);
        break;
      case 6:
        setRolledDice01(Dice6);
        break;
    }
    switch (temp.dice02) {
      case 1:
        setRolledDice02(Dice1);
        break;
      case 2:
        setRolledDice02(Dice2);
        break;
      case 3:
        setRolledDice02(Dice3);
        break;
      case 4:
        setRolledDice02(Dice4);
        break;
      case 5:
        setRolledDice02(Dice5);
        break;
      case 6:
        setRolledDice02(Dice6);
        break;
    }
    switch (temp.dice03) {
      case 1:
        setRolledDice03(Dice1);
        break;
      case 2:
        setRolledDice03(Dice2);
        break;
      case 3:
        setRolledDice03(Dice3);
        break;
      case 4:
        setRolledDice03(Dice4);
        break;
      case 5:
        setRolledDice03(Dice5);
        break;
      case 6:
        setRolledDice03(Dice6);
        break;
    }
    switch (temp.dice04) {
      case 1:
        setRolledDice04(Dice1);
        break;
      case 2:
        setRolledDice04(Dice2);
        break;
      case 3:
        setRolledDice04(Dice3);
        break;
      case 4:
        setRolledDice04(Dice4);
        break;
      case 5:
        setRolledDice04(Dice5);
        break;
      case 6:
        setRolledDice04(Dice6);
        break;
    }
    switch (temp.dice05) {
      case 1:
        setRolledDice05(Dice1);
        break;
      case 2:
        setRolledDice05(Dice2);
        break;
      case 3:
        setRolledDice05(Dice3);
        break;
      case 4:
        setRolledDice05(Dice4);
        break;
      case 5:
        setRolledDice05(Dice5);
        break;
      case 6:
        setRolledDice05(Dice6);
        break;
    }
  }, [temp]);

  const rollDice = () => {
    WebSocket.current.emit("throwDice");
  };

  const reRollDice = () => {
    setDIndex((DIndex = dIndex));
    WebSocket.current.emit("putDice", {
      diceResult: DiceResult,
      diceIndex: DIndex,
    });
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    setDIndex([]);
  };

  useEffect(() => {
    if (putD01 == true) {
      dIndex.push(0);
    }
    if (putD02 == true) {
      dIndex.push(1);
    }
    if (putD03 == true) {
      dIndex.push(2);
    }
    if (putD04 == true) {
      dIndex.push(3);
    }
    if (putD05 == true) {
      dIndex.push(4);
    }
  }, [dIndex]);

  return (
    <View style={styles.main}>
      <GHeader />
      <View style={styles.PNameplatesSite}>
        {userList.map((list, idx1) => {
          if (userScore == true) {
            return (
              <View style={styles.PNameplateSite} key={idx1}>
                <View style={styles.PNameplate}>
                  <Text style={styles.plateTxt}>{list.userName}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.PNameplateSite} key={idx1}>
                <View style={styles.PNameplate}>
                  <Text style={styles.plateTxt}>{list.userName}</Text>
                </View>
                <View style={styles.PScoreplate}>
                  <Text style={styles.scoreTxt2}>0</Text>
                </View>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.PNameplatesSite}>
        {scoreList.map((score, idx3) => {
          return (
            <View style={styles.PNameplateSite} key={idx3}>
              <View style={styles.PScoreplate}>
                <Text style={styles.scoreTxt}>{score.userScore}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.sBoardSite}>
        <ScoreBoard Picked={Picked} ScoreValue={ScoreValue} State={State} />
      </View>
      <View style={styles.diceBoxSite}>
        <View style={styles.diceBox}>
          <View style={styles.boxSquare}>
            <View style={putD01 == true ? styles.putDice : styles.diceImg}>
              <TouchableHighlight
                onPress={() => setPutD01(putD01 == false ? true : false)}
              >
                {2 >= rollChance > 0 ? <Image source={rolledDice01} /> : <></>}
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.boxSquare}>
            <View style={putD02 == true ? styles.putDice : styles.diceImg}>
              <TouchableHighlight
                onPress={() => setPutD02(putD02 == false ? true : false)}
              >
                {2 >= rollChance > 0 ? <Image source={rolledDice02} /> : <></>}
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.boxSquare}>
            <View style={putD03 == true ? styles.putDice : styles.diceImg}>
              <TouchableHighlight
                onPress={() => setPutD03(putD03 == false ? true : false)}
              >
                {2 >= rollChance > 0 ? <Image source={rolledDice03} /> : <></>}
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.boxSquare}>
            <View style={putD04 == true ? styles.putDice : styles.diceImg}>
              <TouchableHighlight
                onPress={() => setPutD04(putD04 == false ? true : false)}
              >
                {2 >= rollChance > 0 ? <Image source={rolledDice04} /> : <></>}
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.boxSquare}>
            <View style={putD05 == true ? styles.putDice : styles.diceImg}>
              <TouchableHighlight
                onPress={() => setPutD05(putD05 == false ? true : false)}
              >
                {2 >= rollChance > 0 ? <Image source={rolledDice05} /> : <></>}
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btnRollSite}>
        <TouchableOpacity
          style={styles.btnRoll}
          activeOpacity={0.9}
          onPress={() => {
            rollDice();
          }}
        >
          <Text style={styles.btnRollTxt}>Roll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnReRoll}
          activeOpacity={0.9}
          onPress={() => {
            reRollDice();
            setChanceCount(rollChance > 0 ? rollChance - 1 : rollChance);
          }}
        >
          <Text style={styles.btnRollTxt}>Re Roll</Text>
          <Text style={styles.CountTxt}>{rollChance}</Text>
        </TouchableOpacity>
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
                      {plCount}/{HCNum}
                    </Text>
                  </View>
                </View>
                {userList.map((list, idx) => {
                  return (
                    <View style={styles.playerBox} key={idx}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  PNameplateSite: {
    alignItems: "center",
  },
  PNameplate: {
    width: 80,
    height: 30,
    borderRadius: 15,
    marginTop: 8,
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
    backgroundColor: "#815E06",
    marginHorizontal: 8,
  },
  PScoreplate: {
    width: 80,
    height: 30,
    shadowColor: "#000",
    marginBottom: 3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  plateTxt: {
    color: "#FFFFFF",
  },
  scoreTxt: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
  },
  scoreTxt2: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 6,
  },
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: "#A8D98A",
    alignItems: "center",
  },
  PNameplatesSite: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 3,
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
  btnRollSite: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnRoll: {
    width: 80,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#815E06",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
    marginRight: 10,
  },
  btnReRoll: {
    width: 130,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#815E06",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row",
    marginLeft: 10,
  },
  btnRollTxt: {
    fontSize: 25,
    color: "#FFFFFF",
  },
  CountTxt: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: 10,
  },
  diceBox: {
    width: "100%",
    height: 80,
    backgroundColor: "#815E06",
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    marginVertical: 15,
  },
  boxSquare: {
    width: 68,
    height: 68,
    borderRadius: 10,
    backgroundColor: "#61490E",
    marginHorizontal: 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
  diceImg: {
    width: "auto",
    height: "auto",
    backgroundColor: "#61490E",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  putDice: {
    width: "auto",
    height: "auto",
    backgroundColor: "#61490E",
    borderWidth: 3,
    borderRadius: 9,
    borderColor: "#F9E42F",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
