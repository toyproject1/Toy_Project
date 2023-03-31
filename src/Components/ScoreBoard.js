import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import GameBtnRule from "./Btns/GameBtnRule";

export default function ScoreBoard(props) {
  const [inputScore, setInputScore] = useState("");
  const [ScoreValue, setScoreValue] = useState({});
  const [Picked, setPicked] = useState({});
  const [State, setState] = useState({});

  // useEffect(() => {
  //   console.log("Ones", props.ScoreValue.Ones);
  //   console.log("Twos", props.ScoreValue.Twos);
  //   console.log("Threes", props.ScoreValue.Threes);
  //   console.log("Fours", props.ScoreValue.Fours);
  //   console.log("Fives", props.ScoreValue.Fives);
  //   console.log("Sixes", props.ScoreValue.Sixes);
  //   console.log("Bonus", props.ScoreValue.Bonus);
  // });

  return (
    <>
      <View style={styles.boardTop}>
        <View style={styles}>
          <View style={styles.nowTurn}>
            <Text></Text>
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
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Ones}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Twos}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Threes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Fours}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Fives}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Sixes}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Bonus}</Text>
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
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Triple}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Four_card}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Full_house}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Small_straight}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Large_straight}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Yahtzee}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.userScoreCell}
              onPress={null}
            >
              <Text>{props.ScoreValue.Chance}</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  boardTop: {
    width: "100%",
    flexDirection: "row",
  },
  nowTurnSite: {
    alignItems: "flex-start",
  },
  btnRuleSite: {
    alignItems: "flex-end",
  },
  btnRule: {
    width: 60,
    height: 30,
    backgroundColor: "#815E06",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
});
