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
import io from "socket.io-client";

const STORAGE_KEY = "@roomData";
// export const socket = io("http://3.38.165.165:3131/");

export default function Channel({ navigation, route }) {
  const { userName } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [roomList, setRoomList] = useState([]);

  const WebSocket = useRef(null);

  useEffect(async () => {
    WebSocket.current = io("http://3.38.165.165:3131/");
    WebSocket.current.on("connect", () => {
      console.log("connected");
    });

    WebSocket.current.on("refreshRoom", (data) => {
      setRoomList([]);
      data.map((mapData) => {
        const tempData = {
          room_id: mapData["room_id"],
          room_name: mapData["room_name"],
          room_state: mapData["room_state"],
          room_max_user: mapData["room_max_user"],
          room_user_count: mapData["room_user_count"],
        };
        setRoomList((current) => {
          return [tempData, ...current];
        });
      });
    });
  }, []);
  const backPress = () => {
    navigation.goBack();
  };

  return roomList.length <= 0 ? (
    ""
  ) : (
    <View style={styles.main}>
      <Header />
      <ScrollView
        persistentScrollbar={true}
        showsVerticalScrollIndicator={true}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {roomList.map((room) => {
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  WebSocket.current.close();
                  navigation.navigate("JoinGameScreen");
                }}
              >
                <Text style={styles.text}>
                  {room.room_id} {room.room_name}
                </Text>
                <Text style={styles.text1}>
                  HostName : {userName} |
                  <Text style={styles.text2}>
                    | {room.room_user_count}/{room.room_max_user}
                  </Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.btns}>
        <Pressable style={styles.btnCG}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("HostGameMenu")}
          >
            <Text style={styles.btnTxt}>Create Game</Text>
          </TouchableOpacity>
        </Pressable>
        <View style={styles.btnMM}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={() => {
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
  text: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 25,
  },
  text1: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 10,
  },
  text2: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
});
