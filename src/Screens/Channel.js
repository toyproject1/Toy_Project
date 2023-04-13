import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
  goBack,
  RefreshControl,
  Button,
  route,
} from "react-native";
import Header from "../Components/Header";
import ChannelButton from "../Components/Btns/ChannelButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBtnRule from "../Components/Btns/HeaderBtnRule";
import io from "socket.io-client";
import { Audio } from "expo-av";

export default function Channel({ navigation }) {
  const [userID, setUserID] = useState();
  const [userName, setUsername] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const backPressed = () => {
    WebSocket.current.close();
    console.log("Test");
    navigation.goBack();
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  const [roomList, setRoomList] = useState([]);

  const WebSocket = useRef(null);

  const backAction = () => {
    WebSocket.current.close();
  };

  const [sound, setSound] = useState();

  const pickSound = async () => {
    const soundOption1 = JSON.parse(await AsyncStorage.getItem("option_state"));
    if(soundOption1.eftSound) {
      const { sound } = await Audio.Sound.createAsync(require("../../assets/pick.mp3"));
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

  useEffect(() => {
    async function getData() {
      try {
        setUserID(
          JSON.parse(
            await AsyncStorage.getItem("userInfo", (error, result) => {
              if (error) console.error("Something went wrong!");
              else if (result)
                console.log("Getting key was successfull", result);
              else if (result === null) console.log("Key does not exists!");
            })
          ).user_id
        );
        setUsername(
          JSON.parse(
            await AsyncStorage.getItem("userInfo", (error, result) => {
              if (error) console.error("Something went wrong!");
              else if (result)
                console.log("Getting key was successfull", result);
              else if (result === null) console.log("Key does not exists!");
            })
          ).user_name
        );
        if (userID !== null) {
          console.log(userID);
        } else {
          console.log("데이터 없음");
        }
      } catch (error) {
        console.log("error");
      }
    }
    getData();

    // const token = AsyncStorage.getItem("userInfo");
    // console.log(token);

    WebSocket.current = io("http://3.38.165.165:3131/");

    WebSocket.current.on("connect", () => {
      console.log("connected");
    });

    WebSocket.current.on("refreshRoom", (data) => {
      setRoomList([]);
      console.log(data);
      data.map((mapData) => {
        const tempData = {
          room_id: mapData["room_id"],
          room_name: mapData["room_name"],
          room_state: mapData["room_state"],
          room_max_user: mapData["room_max_user"],
          room_user_count: mapData["room_user_count"],
          user_name: mapData["user_name"],
        };
        setRoomList((current) => {
          return [tempData, ...current];
        });
      });
    });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const backPress = () => {
    WebSocket.current.close();
    navigation.goBack();
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <View style={styles.headerRule}>
          <HeaderBtnRule />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Yatzy Dice</Text>
        </View>
        <View style={styles.headerMy}>
          <View style={styles.btnSite}>
            <TouchableOpacity onPress={() => {
              pickSound();
              backPress();
            }}>
              <Text style={styles.btnText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {roomList.length <= 0 ? (
          ""
        ) : (
          <View>
            {roomList.map((room) => {
              return (
                <TouchableOpacity
                  style={styles.container}
                  onPress={() => {
                    pickSound();
                    WebSocket.current.close();
                    navigation.navigate("GameScreen", {
                      Host: "User",
                      roomNumber: room.room_id,
                      userID: userID,
                      userName: userName,
                      gTitle: room.room_name,
                      HCNum: room.room_max_user,
                      // plCount: room.room_user_count,
                    });
                  }}
                  key={room.room_id}
                >
                  <View style={styles.tSite}>
                    <View style={styles.rowTxtTop}>
                      <Text style={styles.lTxt}>No.{room.room_id}</Text>
                      <Text style={styles.rTxt}>{room.room_name}</Text>
                    </View>
                    <View style={styles.rowTxtBot}>
                      <Text style={styles.lTxt1}>Host : {room.user_name}</Text>
                      <Text style={styles.rTxt1}>
                        {room.room_user_count}/{room.room_max_user}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.btns}>
        <Pressable style={styles.btnCG}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={() => {
              pickSound();
              WebSocket.current.close();
              navigation.navigate("HostGameMenu");
            }}
          >
            <Text style={styles.btnTxt}>Create Game</Text>
          </TouchableOpacity>
        </Pressable>
        <View style={styles.btnMM}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={() => {
              pickSound();
              WebSocket.current.close();
              navigation.navigate("MainMenu");
            }}
          >
            <Text style={styles.btnTxt}>Main Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#7EB85A",
    height: 54,
  },
  headerRule: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  headerTitleText: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  headerMy: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  btnText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  main: {
    flex: 1,
    backgroundColor: "#A8D98A",
  },
  scrollView: {
    backgroundColor: "#DDF0D1",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
  },
  headCountContain: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  txts: {
    width: "80%",
  },
  txtGTitle: {
    marginTop: 5,
    fontSize: 20,
  },
  input: {
    marginTop: 5,
    marginBottom: 10,
    width: "80%",
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(200, 250, 200, 0.5)",
    borderWidth: 0,
    fontSize: 20,
  },
  btn: {
    width: 115,
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
  },
  btnTxt: {
    fontSize: 18,
  },
  btns: {
    marginBottom: 25,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnCG: {
    marginRight: 15,
  },
  btnMM: {
    marginLeft: 15,
  },
  HeadCountTxt: {
    width: "100%",
    alignItems: "flex-start",
  },
  HDCForm: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputHC: {
    marginTop: 5,
    marginBottom: 10,
    width: "80%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "rgba(200, 250, 200, 0.5)",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },
  hCTxt: {
    fontSize: 20,
  },
  upDownBtns: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  btnUpDown: {
    fontSize: 30,
    marginRight: 10,
  },
  container: {
    width: "75%",
    height: 85,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#815E06",
    alignSelf: "center",
    justifyContent: "center",
  },

  tSite: {
    width: "90%",
    justifyContent: "center",
  },
  rowTxtTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  rowTxtBot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  lTxt: {
    alignItems: "flex-start",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 23,
  },
  rTxt: {
    alignItems: "flex-end",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 23,
  },
  lTxt1: {
    alignItems: "flex-start",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
  rTxt1: {
    alignItems: "flex-end",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
});