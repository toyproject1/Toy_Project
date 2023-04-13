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
  Animated,
  AppState,
  TouchableWithoutFeedback,
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
import ReRoll from "../Components/Imgs/ReRoll.png";
import Toast from "react-native-simple-toast";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { height, width } from "../globalStyles";

export default function GameScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalRankVisible, setModalRankVisible] = useState(false);
  const [modalPlayerVisible, setModalPlayerVisible] = useState(false);

  const [myId, setMyId] = useState();

  // const [roomnumber, setRoomnumber] = useState("001");
  const [plCount, setPlCount] = useState(1);
  const [scoreNum, setScoreNum] = useState(0);
  // const [player, setPlayer] = useState("User Name");
  const [rollChance, setChanceCount] = useState(3);
  // const [ready, setReady] = useState("Wait ...");
  const { gTitle, HCNum, Host, roomNumber, userID, userName, userId } =
    route.params;
  const [userList, setUserList] = useState([]);
  const [scoreList, setScoreList] = useState([]);
  const [rankList, setRankList] = useState([]);

  const [playerSBoard, setPlayerSBoard] = useState({});

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
  let [ScoreValue2, setScoreValue2] = useState({});
  let [State, setState] = useState(null);

  let [picked, setPicked_c] = useState("");
  let [pickedScore, setPickedScore_c] = useState(0);

  let [turnId, setTurnId] = useState();
  let [turnName, setTurnName] = useState();
  const [fadedice, setFadedice] = useState(false);

  const [userBtnCheck, setUserBtnCheck] = useState('Ready');

  const startValue = useRef(new Animated.Value(0)).current;
  const fadeOutValue = useRef(new Animated.Value(0)).current;
  const endValue = 1;
  const duration = 1000;

  const [gameState, setGameState] = useState(false);

  const fadeIn = Animated.timing(startValue, {
    toValue: endValue,
    duration: duration,
    useNativeDriver: true,
  });
  const fadeOut = Animated.timing(startValue, {
    toValue: 0,
    duration: 0,
    useNativeDriver: true,
  });
  const Animfade = Animated.timing(fadeOutValue, {
    toValue: endValue,
    duration: 300,
    useNativeDriver: true,
  });
  const AnimfadeOut = Animated.timing(fadeOutValue, {
    toValue: 0,
    duration: 0,
    useNativeDriver: true,
  });

  const [hjdiceIndex, hjsetDiceIndex] = useState([]);

  const fadeInOut = () => {
    hjsetDiceIndex([0, 1, 2, 3, 4])
    Animated.sequence([fadeIn, fadeOut, Animfade]).start();
  };
  const fadeInOutR = () => {
    Animated.sequence([fadeIn, fadeOut, Animfade]).reset();
  };
  const fadeOutIn = (diceIndex) => {
    hjsetDiceIndex(diceIndex)
    Animated.sequence([AnimfadeOut, fadeIn, fadeOut, Animfade]).start();
  };
  const fadeOutInR = () => {
    Animated.sequence([AnimfadeOut, fadeIn, fadeOut, Animfade]).reset();
  };

  const appState = useRef(AppState.currentState);

  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [sound, setSound] = useState();

  const diceSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    console.log(soundOption1)
    if(soundOption1.eftSound) {
      const {sound} = await Audio.Sound.createAsync(require("../../assets/DiceSound.wav"));
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(0.8);
    }
    // const { sound } = await Audio.Sound.createAsync(require("../../assets/DiceSound.wav"));
    // setSound(sound);
    // await sound.playAsync();
  };
  
  const pickSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    if(soundOption1.eftSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/pick.mp3"));
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(0.9);
    }
    
  };
  
  const scoreSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    if(soundOption1.eftSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/cardPlace3.mp3"));
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(1);
    }
  };
  
  const GameSetSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    if(soundOption1.eftSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/Walking.mp3"));
      setSound(sound);
      await sound.playAsync();
      await sound.setVolumeAsync(1);
    }
  };

  useEffect(() => {
    return ( sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined );
  }, [sound]);
  
  // useEffect(() => {
  //   return ( putDSound ? () => {
  //     console.log('Unloading Sound');
  //     putDSound.unloadAsync();
  //   } : undefined );
  // }, [sound]);

  useEffect(() => {
    WebSocket.current = io("http://3.38.165.165:3131/");
    
    const getMyId = async () =>{
      setMyId(JSON.parse(await AsyncStorage.getItem("userInfo")).user_id);
    }
    getMyId();

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
      Toast.showWithGravity("유저님이 입장하였습니다.", Toast.SHORT, Toast.TOP);
    });

    WebSocket.current.on("joinError", () => {
      console.log("참여 제한");
      Toast.showWithGravity("방이 꽉 찼습니다.", Toast.SHORT, Toast.TOP);
      navigation.navigate("MainMenu");
      WebSocket.current.close();
    });

    WebSocket.current.on("refreshUserList", (data) => {
      console.log('refreshUserList > ', data);
      AsyncStorage.getItem("userInfo").then(r => {
        const stData = JSON.parse(r);
        if(data.userInfo[0].userId === stData.user_id){
          setUserBtnCheck('Start')
        }else {
          setUserBtnCheck('Ready')
        }
      })


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
      setPlCount(tempArr.length);
      setUserList((current) => {
        return tempArr;
      });
    });

    // WebSocket.current.on("refreshUserList", (data) => {
    //   console.log(data);

    //   setUserList([]);
    //   const tempArr = [];
    //   data.userInfo.map((usermap) => {
    //     const tempList = {
    //       userId: usermap.userId,
    //       userName: usermap.userName,
    //       userState: usermap.userState,
    //       userRole: usermap.userRole,
    //     };
    //     tempArr.push(tempList);
    //   });
    //   setUserList((current) => {
    //     return tempArr;
    //   });
    // });

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
      GameSetSound();
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

    WebSocket.current.on("gameStart", async (data) => {
      console.log(data);
      if (data.state === 1) {
        setGameState(true);
        setModalVisible(!modalVisible);
      } else {
        Toast.showWithGravity(
          "아직 모든 유저들이 준비가 되지 않았습니다.",
          Toast.SHORT,
          Toast.TOP
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
        Toast.TOP
      );
      // navigation.navigate("MainMenu");
    });

    WebSocket.current.on("disconnectUser", (data) => {
      console.log(data);
      Toast.showWithGravity("유저가 나갔습니다.", Toast.SHORT, Toast.TOP);
    });

    WebSocket.current.on("changeHost", () => {
      WebSocket.current.emit("changeHost");
    });

    WebSocket.current.on("diceTurn", (data) => {
      fadeInOutR();
      fadeOutInR();
      console.log(data);
      console.log("주사위 굴릴 사람 : ", data.diceTurnName);
      Toast.show(`${data.diceTurnName}의 차례`, Toast.SHORT);
      setTurnId(data.diceTurn);
      setTurn(data.diceTurnName);
      setRolledDice01();
      setRolledDice02();
      setRolledDice03();
      setRolledDice04();
      setRolledDice05();
      setScoreValue2({});
    });

    WebSocket.current.on("throwDice", (data) => {
      console.log(data);
      if (data.state === 0) {
        Toast.showWithGravity(`${data.message}`, Toast.SHORT, Toast.TOP);
      } else {
        diceSound();
        fadeInOut();
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
        setScoreValue2({
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

    WebSocket.current.on("putDice", async (data) => {
      console.log(data);
      if (data.state === 0) {
        Toast.showWithGravity(`${data.message}`, Toast.SHORT, Toast.TOP);
      } else {
        await diceSound();
        fadeOutIn(data.diceIndex);
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
        setScoreValue2({
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
      scoreSound();
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
      setChanceCount(data.diceCount);
    });
    WebSocket.current.on("getUserScoreBoard", (data) => {
      console.log(data);
      setPlayerSBoard({
        modal_userId: data.userId,
        modal_userName: data.userName,
        modal_ones: data.ones,
        modal_twos: data.twos,
        modal_threes: data.threes,
        modal_fours: data.fours,
        modal_fives: data.fives,
        modal_sixes: data.sixes,
        modal_bonus: data.bonus,
        modal_triple: data.triple,
        modal_four_card: data.four_card,
        modal_full_house: data.full_house,
        modal_small_straight: data.small_straight,
        modal_large_straight: data.large_straight,
        modal_yahtzee: data.yahtzee,
        modal_chance: data.chance,
      });
      setModalPlayerVisible(true);
    });
    // 사용자가 앱의 상태가 변경 되었을 경우 실행이 된다.
    AppState.addEventListener("change", fn_handleAppStateChange);
    const backAction = () => {
      Alert.alert("Hold on!", "게임을 나가시겠습니까?", [
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
    return () => {
      backHandler.remove();
    };
  }, []);

  const fn_handleAppStateChange =
    ("change",
    (nextAppState) => {
      console.log("appState.current ::: ", appState.current);

      if (appState.current === "background" && nextAppState === "active") {
        console.log("앱으로 다시 돌아오는 경우 foreground");
        navigation.reset({ routes: [{ name: "MainMenu" }] });
      } else {
        console.log("asdsadsa");
        WebSocket.current.close();
      }
      appState.current = nextAppState; // 변경된 상태를 바꿔줌.
      setAppStateVisible(appState.current);
    });

  useEffect(() => {
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
    setDIndex((DIndex = dIndex));
    WebSocket.current.emit("tempthrowDice", {
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
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("ones") == false && ScoreValue2.Ones !== undefined) {
      Alert.alert("Aces", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "ones",
            });
          },
        },
      ]);
    }
  };
  const inputTwos = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("twos") == false && ScoreValue2.Twos !== undefined) {
      Alert.alert("Twos", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "twos",
            });
          },
        },
      ]);
    }
  };
  const inputThrees = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("threes") == false && ScoreValue2.Threes !== undefined) {
      Alert.alert("Threes", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "threes",
            });
          },
        },
      ]);
    }
  };
  const inputFours = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("fours") == false && ScoreValue2.Fours !== undefined) {
      Alert.alert("Fours", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "fours",
            });
          },
        },
      ]);
    }
  };
  const inputFives = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("fives") == false && ScoreValue2.Fives !== undefined) {
      Alert.alert("Fives", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "fives",
            });
          },
        },
      ]);
    }
  };
  const inputSixes = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("sixes") == false && ScoreValue2.Sixes !== undefined) {
      Alert.alert("Sixes", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "sixes",
            });
          },
        },
      ]);
    }
  };
  const inputTriple = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("triple") == false && ScoreValue2.Triple !== undefined) {
      Alert.alert("Triple", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "triple",
            });
          },
        },
      ]);
    }
  };
  const inputFour_card = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("four_card") == false && ScoreValue2.Four_card !== undefined) {
      Alert.alert("Four Card", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "four_card",
            });
          },
        },
      ]);
    }
  };
  const inputFull_house = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("full_house") == false && ScoreValue2.Full_house !== undefined) {
      Alert.alert("Full House", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "full_house",
            });
          },
        },
      ]);
    }
  };
  const inputSmall_straight = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("small_straight") == false && ScoreValue2.Small_straight !== undefined) {
      Alert.alert("Small Straight", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "small_straight",
            });
          },
        },
      ]);
    }
  };
  const inputLarge_straight = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("large_straight") == false && ScoreValue2.Large_straight !== undefined) {
      Alert.alert("Large Straight", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "large_straight",
            });
          },
        },
      ]);
    }
  };
  const inputYahtzee = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("yahtzee") == false && ScoreValue2.Yahtzee !== undefined) {
      Alert.alert("Yatzy", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "yahtzee",
            });
          },
        },
      ]);
    }
  };
  const inputChance = () => {
    setPutD01(false);
    setPutD02(false);
    setPutD03(false);
    setPutD04(false);
    setPutD05(false);
    if (Picked.includes("chance") == false && ScoreValue2.Chance !== undefined) {
      Alert.alert("Chance", "점수를 입력하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        {
          text: "확인",
          onPress: () => {
            WebSocket.current.emit("saveScore", {
              scoreType: "chance",
            });
          },
        },
      ]);
    }
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

  useEffect(() => {
    if (modalVisible === false && gameState !== true) {
      WebSocket.current.close();
      console.log("test!!!!===", modalVisible);
      navigation.reset({ routes: [{ name: "MainMenu" }] });
    }
  }, [gameState, modalVisible]);

  return (
    <View style={styles.main}>
      <GHeader />
      <View style={styles.PNameplatesSite}>
        {userList.map((list, idx1) => {
          if (userScore == true) {
            return (
              <View style={styles.PNameplateSite} key={idx1}>
                <TouchableOpacity
                  style={styles.PNameplate}
                  activeOpacity={0.9}
                  onPress={() => {
                    pickSound();
                    console.log("선택한 유저의 태그 아이디 : ", list.userId);
                    setPlayerSBoard({});
                    WebSocket.current.emit("getUserScoreBoard", {
                      userId: list.userId,
                    });
                    // setModalPlayerVisible(true);
                  }}
                >
                  <Text style={styles.plateTxt}>{list.userName}</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.PNameplateSite} key={idx1}>
                <TouchableOpacity
                  style={styles.PNameplate}
                  activeOpacity={0.9}
                  onPress={() => {
                    pickSound();
                    WebSocket.current.emit("getUserScoreBoard", {
                      userId: list.userId,
                    });
                    setModalPlayerVisible(true);
                    console.log("선택한 유저의 태그 아이디 : ", list.userId);
                    console.log(
                      "유저의 점수판을 가져옴 : ",
                      playerSBoard.modal_ones
                    );
                  }}
                >
                  <Text style={styles.plateTxt}>{list.userName}</Text>
                </TouchableOpacity>
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
      <Modal // 플레이어 태그 터치 시에 나오는 모달
        animationType="none"
        transparent={true}
        visible={modalPlayerVisible}
        onRequestClose={() => {
          setModalPlayerVisible(!modalPlayerVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalPlayerVisible(false)}>
          <View style={styles.modalBG}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.PModalCard}>
                <View style={styles.PModalHeader}>
                  <Text style={styles.PModalHeaderTitle}>
                    {playerSBoard.modal_userName}
                  </Text>
                </View>
                <View style={styles.MSBoardSite}>
                  <View style={styles.sBoardV}>
                    <View style={styles.sBoard}>
                      <View style={styles.sNameColumn}>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Aces</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Twos</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Threes</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Fours</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Fives</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Sixes</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Bonus</Text>
                        </View>
                      </View>
                      <View style={styles.userScoreColumn}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_ones}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_twos}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_threes}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_fours}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_fives}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_sixes}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.savedUserScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_bonus}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.sNameColumn}>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Triple</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Four card</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Full House</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Small Straight</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Large Straight</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Yatzy</Text>
                        </View>
                        <View style={styles.sNameCell}>
                          <Text style={styles.MSNameTxt}>Chance</Text>
                        </View>
                      </View>
                      <View style={styles.userScoreColumn}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_triple}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_four_card}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_full_house}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_small_straight}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_large_straight}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_yahtzee}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.userScoreCell}
                        >
                          <Text style={styles.MScoreTxt}>
                            {playerSBoard.modal_chance}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
                <Text style={styles.sNameTxt}>Aces</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Twos</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Threes</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Fours</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Fives</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Sixes</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Bonus</Text>
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
                onPress={() => {turnId == myId ? inputOnes() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("ones") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Ones}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("twos") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputTwos() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("twos") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Twos}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("threes") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputThrees() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("threes") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Threes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("fours") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputFours() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("fours") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Fours}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("fives") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputFives() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("fives") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Fives}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("sixes") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputSixes() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("sixes") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Sixes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.i == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
              >
                <Text style={styles.savedScoreTxt}>{ScoreValue.Bonus}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sNameColumn}>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Triple</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Four Card</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Full House</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Small Straight</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Large Straight</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Yatzy</Text>
              </View>
              <View style={styles.sNameCell}>
                <Text style={styles.sNameTxt}>Chance</Text>
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
                onPress={() => {turnId == myId ? inputTriple() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("triple") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Triple}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("four_card") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputFour_card() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("four_card") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Four_card}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("full_house") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputFull_house() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("full_house") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Full_house}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("small_straight") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputSmall_straight() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("small_straight") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Small_straight}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("large_straight") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputLarge_straight() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("large_straight") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Large_straight}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("yahtzee") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputYahtzee() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("yahtzee") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Yahtzee}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={
                  Picked.includes("chance") == false
                    ? styles.userScoreCell
                    : styles.savedUserScoreCell
                }
                onPress={() => {turnId == myId ? inputChance() : <></>}}
              >
                <Text
                  style={
                    Picked.includes("chance") == false
                      ? styles.unsavedScoreTxt
                      : styles.savedScoreTxt
                  }
                >
                  {ScoreValue.Chance}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.diceBoxSite}>
        <View style={styles.diceBox}>
          <View style={styles.boxSquare}>
            <Animated.Image
              source={require("../Components/Imgs/direroll1.gif")}
              style={[styles.diceSquare, { opacity: startValue }]}
            />
            <Animated.View style={
             hjdiceIndex.includes(0) ? [{ opacity: fadeOutValue }] : [{ }]
             }>
              <TouchableHighlight
                style={turnId == myId && putD01 == true ? styles.putDice : styles.diceImg}
                onPress={() => {
                  turnId == myId ? pickSound() : <></>;
                  setPutD01(turnId == myId && putD01 == false ? true : false);
                }}
              >
                {2 >= rollChance > 0 ? <Image source={rolledDice01} /> : <></>}
              </TouchableHighlight>
              <Pressable
                style={styles.reRollIcon}
                onPress={() => {
                  turnId == myId ? pickSound() : <></>;
                  setPutD01(turnId == myId && putD01 == false ? true : false);
                }}
              >
                {turnId == myId && putD01 == true ? <Image source={ReRoll} /> : <></>}
              </Pressable>
            </Animated.View>
          </View>
          <View>
            <View style={styles.boxSquare}>
              <Animated.Image
                source={require("../Components/Imgs/direroll1.gif")}
                style={[styles.diceSquare, { opacity: startValue }]}
              />
              <Animated.View style={
                  hjdiceIndex.includes(1) ? [{ opacity: fadeOutValue }] : [{ }]
                }>
                <TouchableHighlight
                  style={turnId == myId && putD02 == true ? styles.putDice : styles.diceImg}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD02(turnId == myId && putD02 == false ? true : false);
                  }}
                >
                  {2 >= rollChance > 0 ? (
                    <Image source={rolledDice02} />
                  ) : (
                    <></>
                  )}
                </TouchableHighlight>
                <Pressable
                  style={styles.reRollIcon}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD02(turnId == myId && putD02 == false ? true : false);
                  }}
                >
                  {turnId == myId && putD02 == true ? <Image source={ReRoll} /> : <></>}
                </Pressable>
              </Animated.View>
            </View>
          </View>
          <View>
            <View style={styles.boxSquare}>
              <Animated.Image
                source={require("../Components/Imgs/direroll1.gif")}
                style={[styles.diceSquare, { opacity: startValue }]}
              />
              <Animated.View style={
             hjdiceIndex.includes(2) ? [{ opacity: fadeOutValue }] : [{ }]
             }>
                <TouchableHighlight
                  style={turnId == myId && putD03 == true ? styles.putDice : styles.diceImg}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD03(turnId == myId && putD03 == false ? true : false);
                  }}
                >
                  {2 >= rollChance > 0 ? (
                    <Image source={rolledDice03} />
                  ) : (
                    <></>
                  )}
                </TouchableHighlight>
                <Pressable
                  style={styles.reRollIcon}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD03(turnId == myId && putD03 == false ? true : false);
                  }}
                >
                  {turnId == myId && putD03 == true ? <Image source={ReRoll} /> : <></>}
                </Pressable>
              </Animated.View>
            </View>
          </View>
          <View>
            <View style={styles.boxSquare}>
              <Animated.Image
                source={require("../Components/Imgs/direroll1.gif")}
                style={[styles.diceSquare, { opacity: startValue }]}
              />
              <Animated.View style={
             hjdiceIndex.includes(3) ? [{ opacity: fadeOutValue }] : [{ }]
             }>
                <TouchableHighlight
                  style={turnId == myId && putD04 == true ? styles.putDice : styles.diceImg}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD04(turnId == myId && putD04 == false ? true : false);
                  }}
                >
                  {2 >= rollChance > 0 ? (
                    <Image source={rolledDice04} />
                  ) : (
                    <></>
                  )}
                </TouchableHighlight>
                <Pressable
                  style={styles.reRollIcon}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD04(turnId == myId && putD04 == false ? true : false);
                  }}
                >
                  {turnId == myId && putD04 == true ? <Image source={ReRoll} /> : <></>}
                </Pressable>
              </Animated.View>
            </View>
          </View>
          <View>
            <View style={styles.boxSquare}>
              <Animated.Image
                source={require("../Components/Imgs/direroll1.gif")}
                style={[styles.diceSquare, { opacity: startValue }]}
              />
              <Animated.View style={
             hjdiceIndex.includes(4) ? [{ opacity: fadeOutValue }] : [{ }]
             }>
                <TouchableHighlight
                  style={turnId == myId && putD05 == true ? styles.putDice : styles.diceImg}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD05(turnId == myId && putD05 == false ? true : false);
                  }}
                >
                  {2 >= rollChance > 0 ? (
                    <Image source={rolledDice05} />
                  ) : (
                    <></>
                  )}
                </TouchableHighlight>
                <Pressable
                  style={styles.reRollIcon}
                  onPress={() => {
                    turnId == myId ? pickSound() : <></>;
                    setPutD05(turnId == myId && putD05 == false ? true : false);
                  }}
                >
                  {turnId == myId && putD05 == true ? <Image source={ReRoll} /> : <></>}
                </Pressable>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btnRollSite}>
        <TouchableOpacity
          style={styles.btnRoll}
          activeOpacity={0.9}
          onPress={() => {
            // turnId == myId ? pickSound() : <></>;
            rollDice();
          }}
        >
          <Text style={styles.btnRollTxt}>Roll</Text>
          <Text style={styles.CountTxt}>{rollChance}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btnReRoll}
          activeOpacity={0.9}
          onPress={() => {
            reRollDice();
            // setChanceCount(rollChance > 0 ? rollChance - 1 : rollChance);
          }}
        >
          <Text style={styles.btnRollTxt}>Re Roll</Text>
          <Text style={styles.CountTxt}>{rollChance}</Text>
        </TouchableOpacity> */}
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
                      pickSound();
                      WebSocket.current.emit("gameReadyBtn");
                    }}
                  >
                    <Text style={styles.btnClose}>{userBtnCheck}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      pickSound();
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
                {rankList.map((rank, index) => {
                  return (
                    <View style={styles.playerBox} key={index}>
                      <Text style={styles.player}>{index + 1}등</Text>
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
    marginTop: width * 8,
  },
  PNameplate: {
    width: width * 80,
    height: height * 30,
    borderRadius: width * 15,
    marginTop: width * 8,
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
    marginHorizontal: width * 6,
  },
  PScoreplate: {
    width: width * 80,
    height: height * 30,
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
    marginHorizontal: width * 6,
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
    marginTop: height * 6,
    marginBottom: height * 10,
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
  reRollIcon: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 11,
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
    width: "auto",
    height: height * 60,
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
    paddingHorizontal: width * 20,
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
    marginRight: width * 8,
  },
  CountTxt: {
    fontSize: 25,
    color: "#FFFFFF",
    marginLeft: width * 8,
  },
  diceBox: {
    width: "100%",
    height: width * 80,
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
    width: width * 68,
    height: width * 68,
    borderRadius: 10,
    backgroundColor: "#61490E",
    marginHorizontal: width * 1.8,
    alignItems: "center",
    justifyContent: "center",
  },
  diceSquare: {
    position: "absolute",
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
    height: height * 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#815E06",
    borderWidth: width * 0.25,
    borderColor: "#000000",
  },
  sNameTxt: {
    color: "#FFFFFF",
  },
  userScoreColumn: {
    width: "28%",
    flexDirection: "column",
  },
  userScoreCell: {
    height: height * 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: width * 0.25,
    textAlign: "center",
    borderColor: "#000000",
  },
  savedUserScoreCell: {
    height: height * 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4923D",
    borderWidth: width * 0.25,
    textAlign: "center",
    borderColor: "#000000",
  },
  unsavedScoreTxt: {
    color: "#000000",
  },
  savedScoreTxt: {
    color: "#FFFFFF",
  },
  rankHeader: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  PModalCard: {
    flex: height * 0.6,
    alignItems: "center",
    width: "80%",
    backgroundColor: "#A8D98A",
  },
  PModalHeader: {
    width: "100%",
    backgroundColor: "#7EB85A",
    height: height * 54,
    alignItems: "center",
    justifyContent: "center",
  },
  PModalHeaderTitle: {
    fontSize: 25,
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  MSBoardSite: {
    width: "90%",
    marginVertical: height * 20,
  },
  MSNameTxt: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  MScoreTxt: {
    fontSize: 10,
    color: "#000000",
  },
});
