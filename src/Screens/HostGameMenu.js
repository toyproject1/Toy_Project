import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../Components/Header";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

export default function HostGameMenu({ navigation }) {
  const [gTitle, onChangeGTitle] = useState("");
  let gTitlePH = "Player10's Game";
  const [HCNum, onChangeHCNum] = useState(2);
  const [userID, setUserID] = useState();
  const [userName, setUsername] = useState();
  const [Host, setHost] = useState("Host");
  // const [Room, setRoom] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        setUserID(JSON.parse(await AsyncStorage.getItem("userInfo")).user_id);
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
    };
    getData();
  }, []);

  async function postGData() {
    let tempData;
    try {
      if (gTitle == "") {
        onChangeGTitle((gTitle = gTitlePH));
      }
      const access_token = await AsyncStorage.getItem("access_token");
      const refresh_token = await AsyncStorage.getItem("refresh_token");

      const userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"));
      const iat = userInfo.iat;
      const exp = userInfo.exp;
      // const exp = await AsyncStorage.getItem("userInfo")["exp"];
      console.log("iat ==============", iat);
      console.log("iat ==============", exp);

      var d = Math.round(new Date().getTime() / 1000);

      console.log(d);

      // console.log("asdasdsadasdas", d.getTime() / 1000);
      if (iat > d || exp < d) {
        console.log("check1");

        const header = {
          Authorization: `Bearer ${refresh_token}`,
        };
        console.log("check2", header);
        let response1;
        try {
          response1 = await axios.put(
            "http://3.38.165.165:3000/api/getAccessToken",
            {},
            { headers: header }
          );
        } catch (e) {
          console.log(e);
        }

        // console.log(
        //   "==========================================res",
        //   response1.data
        // );
        await AsyncStorage.setItem("access_token", response1.data.access_token);
        const parts = await response1.data.access_token
          .split(".")
          .map((part) =>
            Buffer.from(
              part.replace(/-/g, "+").replace(/_/g, "/"),
              "base64"
            ).toString()
          );
        console.log("======", parts[1]);
        const payload = parts[1];
        await AsyncStorage.setItem("userInfo", payload);
        // await AsyncStorage.setItem("userInfo", )
      }

      const header = {
        Authorization: `Bearer ${await AsyncStorage.getItem("access_token")}`,
      };
      console.log("=====================", header);
      const response = await axios.post(
        "http://3.38.165.165:3000/api/createRoom",
        {
          user_id: userID,
          roomName: gTitle,
          room_max_user: HCNum,
        },
        { headers: header }
      );
      tempData = {
        room_id: response.data.room_id,
        room_name: response.data.room_name,
        room_state: response.data.room_state,
        room_user_count: response.data.room_user_count,
        room_max_user: response.data.room_max_user,
        user_id: response.data.user_id,
      };
      console.log(tempData);
    } catch (error) {
      console.log(error);
      console.log("응답 실패");
    }
    return tempData;
  }

  return (
    <View style={styles.main}>
      <Header />
      <View>
        <View style={styles.container}>
          <View style={styles.txts}>
            <Text style={styles.txtGTitle}>Game Title</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeGTitle}
            value={gTitle}
          />
          <View style={styles.headCountContain}>
            <View style={styles.HeadCountTxt}>
              <Text style={styles.txtGTitle}>Head Count</Text>
              <View style={styles.HDCForm}>
                <View style={styles.inputHC}>
                  <Text style={styles.hCTxt}>{HCNum}</Text>
                </View>
                <View style={styles.upDownBtns}>
                  <Pressable
                    onPress={() => onChangeHCNum(HCNum < 4 ? HCNum + 1 : HCNum)}
                  >
                    <Text style={styles.btnUpDown}>▲</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => onChangeHCNum(HCNum > 2 ? HCNum - 1 : HCNum)}
                  >
                    <Text style={styles.btnUpDown}>▼</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.btns}>
            <Pressable style={styles.btnCG}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.9}
                // onPress={onSubmit}
                onPress={async () => {
                  const tempPostData = await postGData();
                  navigation.navigate("GameScreen", {
                    gTitle: gTitle,
                    HCNum: HCNum,
                    Host: Host,
                    roomNumber: tempPostData.room_id,
                    userId: tempPostData.user_id,
                    userName: userName,
                  });
                }}
                // postGData(); 방 생성 요청.
              >
                <Text style={styles.btnTxt}>Create Game</Text>
              </TouchableOpacity>
            </Pressable>
            <View style={styles.btnMM}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("MainMenu")}
                // onPress={navigation.goBack}
              >
                <Text style={styles.btnTxt}>Main Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  },
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "35%",
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 100,
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
});
