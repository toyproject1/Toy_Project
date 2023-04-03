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
  BackHandler,
} from "react-native";
import GHeader from "../Components/GHeader";
import GameBtnRule from "../Components/Btns/GameBtnRule";
import { io } from "socket.io-client";
import Dice1 from "../Components/Imgs/Dice01.png";
import Dice2 from "../Components/Imgs/Dice02.png";
import Dice3 from "../Components/Imgs/Dice03.png";
import Dice4 from "../Components/Imgs/Dice04.png";
import Dice5 from "../Components/Imgs/Dice05.png";
import Dice6 from "../Components/Imgs/Dice06.png";
import Toast from "react-native-simple-toast";

export default function GameScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalRankVisible, setModalRankVisible] = useState(false);
  // const [roomnumber, setRoomnumber] = useState("001");
  const [plCount, setPlCount] = useState(1);
  const [scoreNum, setScoreNum] = useState(0);
  // const [player, setPlayer] = useState("User Name");
  const [rollChance, setChanceCount] = useState(2);
  // const [ready, setReady] = useState("Wait ...");
  const { gTitle, HCNum, Host, roomNumber, userID, userName } = route.params;
  const [userList, setUserList] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [rankList, setRankList] = useState([]);

  const WebSocket = useRef(null);
  //console.log(gTitle, HCNum, roomNumber, userId, userName, Host);

  let [turn, setTurn] = useState();

  // 주사위 이미지를 띄워주기 위한 sueState
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

  let [temp, setTemp] = useState({});

  let dIndex = [];
  let [DIndex, setDIndex] = useState([]);

  let [DiceResult, setDiceResult] = useState({});
  let [userScore, setUserScore] = useState(false);
  let [Picked, setPicked] = useState([]);
  let [ScoreValue, setScoreValue] = useState({});
  let [State, setState] = useState(null);

  let [picked, setPicked_c] = useState("");
  let [pickedScore, setPickedScore_c] = useState(0);

  let [turnId, setTurnId] = useState();
  let [turnName, setTurnName] = useState();

  useEffect(() => {
    WebSocket.current = io("http://3.38.165.165:3131/");
    WebSocket.current.on("connect", () => {
      console.log("connected");
    });

    // userData();

    if (Host == "Host") {
      WebSocket.current.emit("hostCreateRoom", {
        userId: userID,
        userName: userName,
        roomNumber: roomNumber,
      });
    } else {
      // 일반유저 Host == 'User' 일 경우
      console.log(
        "========================joinUser ==============================="
      );
      WebSocket.current.emit("joinRoom", {
        userId: userID,
        userName: userName,
        roomNumber: roomNumber,
      });
      console.log(userID, userName, roomNumber);
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
      console.log(data.length);
      console.log(data.length);
      console.log(data.length);
      setModalRankVisible(!modalRankVisible);
      setRankList([]);
      const rankArr = [];
      data.map((rankmap) => {
        const rankScore = {
          length: rankmap.length,
          userName: rankmap.userName,
          userScore: rankmap.userScore,
        };
        rankArr.push(rankScore);
      });
      setRankList((current) => {
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
      console.log(data);
      console.log("주사위 굴릴 사람 : ", data.diceTurnName);
      setTurn(data.diceTurnName);
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
        setChanceCount(data.diceCount);
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
        setChanceCount(data.diceCount);
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
    WebSocket.current.on("userScoreBoard", (data) => {
      console.log(data);
      // console.log("다음 유저 점수판 : ", data);
      setPicked(data.picked);
      setScoreValue({
        Ones: data.scoreBoard.ones,
        Twos: data.scoreBoard.twos,
        Threes: data.scoreBoard.threes,
        Fours: data.scoreBoard.fours,
        Fives: data.scoreBoard.fives,
        Sixes: data.scoreBoard.sixes,
        Bonus: data.scoreBoard.bonus,
        Triple: data.scoreBoard.triple,
        Four_card: data.scoreBoard.four_card,
        Full_house: data.scoreBoard.full_house,
        Small_straight: data.scoreBoard.small_straight,
        Large_straight: data.scoreBoard.large_straight,
        Yahtzee: data.scoreBoard.yahtzee,
        Chance: data.scoreBoard.chance,
      });
    });
    const backAction = () => {
      Alert.alert("Hold on!", "게임을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            navigation.navigate("MainMenu");
            WebSocket.current.close();
          },
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);

  useEffect(() => {
    // console.log("==================================");
    // console.log(typeof temp.dice01);
    // console.log("dice01 :" + temp.dice01);
    // console.log("dice02 :" + temp.dice02);
    // console.log("dice03 :" + temp.dice03);
    // console.log("dice04 :" + temp.dice04);
    // console.log("dice05 :" + temp.dice05);
    // console.log("==================================");
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

  const inputOnes = () => {
    // setPicked_c("ones");
    // setPickedScore_c(ScoreValue.Ones);
    WebSocket.current.emit("saveScore", {
      scoreType: "ones",
      // scoreValue: pickedScore
    });
  };
  const inputTwos = () => {
    // setPicked_c("twos");
    // setPickedScore_c(ScoreValue.Twos);
    WebSocket.current.emit("saveScore", {
      scoreType: "twos",
      // scoreValue: pickedScore
    });
  };
  const inputThrees = () => {
    // setPicked_c("threes");
    // setPickedScore_c(ScoreValue.Threes);
    WebSocket.current.emit("saveScore", {
      scoreType: "threes",
      // scoreValue: pickedScore
    });
  };
  const inputFours = () => {
    // setPicked_c("fours");
    // setPickedScore_c(ScoreValue.Fours);
    WebSocket.current.emit("saveScore", {
      scoreType: "fours",
      // scoreValue: pickedScore
    });
    setPicked([]);
  };
  const inputFives = () => {
    // setPicked_c("fives");
    // setPickedScore_c(ScoreValue.Fives);
    WebSocket.current.emit("saveScore", {
      scoreType: "fives",
      // scoreValue: pickedScore
    });
  };
  const inputSixes = () => {
    // setPicked_c("sixes");
    // setPickedScore_c(ScoreValue.Sixes);
    WebSocket.current.emit("saveScore", {
      scoreType: "sixes",
      // scoreValue: pickedScore
    });
    // };
    // const inputBonus = () => {
    //   // setPicked_c("bonus");
    //   // setPickedScore_c(ScoreValue.Bonus);
    //   WebSocket.current.emit("saveScore", {
    //     scoreType: "bonus",
    //     // scoreValue: pickedScore
    //   });
  };
  const inputTriple = () => {
    // setPicked_c("triple");
    // setPickedScore_c(ScoreValue.Triple);
    WebSocket.current.emit("saveScore", {
      scoreType: "triple",
      // scoreValue: pickedScore
    });
  };
  const inputFour_card = () => {
    // setPicked_c("four_card");
    // setPickedScore_c(ScoreValue.Four_card);
    WebSocket.current.emit("saveScore", {
      scoreType: "four_card",
      // scoreValue: pickedScore
    });
  };
  const inputFull_house = () => {
    // setPicked_c("full_house");
    // setPickedScore_c(ScoreValue.Full_house);
    WebSocket.current.emit("saveScore", {
      scoreType: "full_house",
      // scoreValue: pickedScore
    });
  };
  const inputSmall_straight = () => {
    // setPicked_c("small_straight");
    // setPickedScore_c(ScoreValue.Small_straight);
    WebSocket.current.emit("saveScore", {
      scoreType: "small_straight",
      // scoreValue: pickedScore
    });
  };
  const inputLarge_straight = () => {
    // setPicked_c("large_straight");
    // setPickedScore_c(ScoreValue.Large_straight);
    WebSocket.current.emit("saveScore", {
      scoreType: "large_straight",
      // scoreValue: pickedScore
    });
  };
  const inputYahtzee = () => {
    // setPicked_c("yahtzee");
    // setPickedScore_c(ScoreValue.Yahtzee);
    WebSocket.current.emit("saveScore", {
      scoreType: "yahtzee",
      // scoreValue: pickedScore
    });
  };
  const inputChance = () => {
    // setPicked_c("chance");
    // setPickedScore_c(ScoreValue.Chance);
    WebSocket.current.emit("saveScore", {
      scoreType: "chance",
      // scoreValue: pickedScore
    });
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

  // useEffect(()=>{
  //   console.log("Picked 타입 : ", typeof picked);
  //   console.log("Picked : ", picked);
  //   console.log("PickedScore 타입 : ", typeof pickedScore);
  //   console.log("PickedScore : ", pickedScore);
  // },[picked]);

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
        <View style={styles.boardTop}>
          <View style={styles.nowTurnSite}>
            <View style={styles.nowTurn}>
              <Text style={styles.nowTurnTxt}>{turn}'s Turn</Text>
            </View>
          </View>
          <View style={styles.btnRuleSite}>
            <View style={styles.btnRule}>
              <GameBtnRule />
            </View>
          </View>
        </View>
        <View style={styles.sBoardV}>
          <View style={styles.sBoard}>
            <View style={styles.sNameColumn}>
              <View style={styles.sNameCell}>
                <Text>Aces</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Twos</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Threes</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Fours</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Fives</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Sixes</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Bonus</Text>
              </View>
            </View>
            <View style={styles.userScoreColumn}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("ones") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputOnes()}
              >
                <Text>{ScoreValue.Ones}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("twos") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputTwos()}
              >
                <Text>{ScoreValue.Twos}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("threes") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputThrees()}
              >
                <Text>{ScoreValue.Threes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("fours") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputFours()}
              >
                <Text>{ScoreValue.Fours}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("fives") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputFives()}
              >
                <Text>{ScoreValue.Fives}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("sixes") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputSixes()}
              >
                <Text>{ScoreValue.Sixes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.i == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
              >
                <Text>{ScoreValue.Bonus}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sNameColumn}>
              <View style={styles.sNameCell}>
                <Text>Three of A Kind</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Four of A Kind</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Full House</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Small Straight</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Large Straight</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Yahtzee</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text>Chance</Text>
              </View>
            </View>
            <View style={styles.userScoreColumn}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("triple") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputTriple()}
              >
                <Text>{ScoreValue.Triple}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("four_card") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputFour_card()}
              >
                <Text>{ScoreValue.Four_card}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("full_house") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputFull_house()}
              >
                <Text>{ScoreValue.Full_house}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("small_straight") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputSmall_straight()}
              >
                <Text>{ScoreValue.Small_straight}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("large_straight") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputLarge_straight()}
              >
                <Text>{ScoreValue.Large_straight}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("yahtzee") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputYahtzee()}
              >
                <Text>{ScoreValue.Yahtzee}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("chance") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => inputChance()}
              >
                <Text>{ScoreValue.Chance}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.totalScoreRow}>
            <View style={styles.totalCell}>
              <Text>Total</Text>
            </View>
            <View style={styles.totalScoreCell}>
              <Text></Text>
            </View>
          </View>
        </View>
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
            // setChanceCount(rollChance > 0 ? rollChance - 1 : rollChance);
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
                      navigation.reset({ routes: [{ name: "MainMenu" }] });
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
                {rankList.map((rank, idx4) => {
                  return (
                    <View style={styles.playerBox} key={idx4}>
                      <Text style={styles.player}>{rank.length}등</Text>
                      <Text style={styles.player}>{rank.userName}</Text>
                      <Text style={styles.player}>{rank.userScore}</Text>
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
  boardTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nowTurn: {
    width: "auto",
    height: 30,
    backgroundColor: "#815E06",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
  },
  nowTurnTxt: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  nowTurnSite: {
    alignItems: "flex-start",
  },
  btnRuleSite: {
    alignItems: "flex-end",
  },
  btnRule: {
    width: "auto",
    height: 30,
    backgroundColor: "#815E06",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
  },
  sBoardV: {
    width: "100%",
    height: "auto",
    flexDirection: "column",
  },
  sBoard: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    backgroundColor: "#000000",
  },
  sNameColumn: {
    width: "22%",
    flexDirection: "column",
  },
  sNameCell: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D3D3D3",
    borderWidth: 1,
  },
  userScoreColumn: {
    width: "28%",
    flexDirection: "column",
  },
  userScoreCell: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    textAlign: "center",
  },
  savedUserScoreCell: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D3D3D3",
    borderWidth: 1,
    textAlign: "center",
  },
  totalScoreRow: {
    width: "100%",
    flexDirection: "row",
  },
  totalCell: {
    width: "22%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D3D3D3",
    borderWidth: 1,
  },
  totalScoreCell: {
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
  },
  rankHeader: {
    fontSize: 30,
    color: "#FFFFFF",
  },
});
