import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import GameBtnRule from "./Btns/GameBtnRule";

export default function ScoreBoard () {
  const [inputScore, setInputScore] = useState("");
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
            <GameBtnRule/>
          </View>
        </View>
      </View>
      <View style={styles.sBoardV}>
        <View style={styles.sBoard}>
          <View style={styles.sNameColumn}>
            <View style={styles.sNameCell}><Text>Aces</Text></View>
            <View style={styles.sNameCell}><Text>Twos</Text></View>
            <View style={styles.sNameCell}><Text>Threes</Text></View>
            <View style={styles.sNameCell}><Text>Fours</Text></View>
            <View style={styles.sNameCell}><Text>Fives</Text></View>
            <View style={styles.sNameCell}><Text>Sixes</Text></View>
            <View style={styles.sNameCell}><Text>Bonus</Text></View>
          </View>
          <View style={styles.userScoreColumn}>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
          </View>
          <View style={styles.sNameColumn}>
            <View style={styles.sNameCell}><Text>Three of A Kind</Text></View>
            <View style={styles.sNameCell}><Text>Four of A Kind</Text></View>
            <View style={styles.sNameCell}><Text>Full House</Text></View>
            <View style={styles.sNameCell}><Text>Small Straight</Text></View>
            <View style={styles.sNameCell}><Text>Large Straight</Text></View>
            <View style={styles.sNameCell}><Text>Yahtzee</Text></View>
            <View style={styles.sNameCell}><Text>Chance</Text></View>
          </View>
          <View style={styles.userScoreColumn}>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} style={styles.userScoreCell}><Text></Text></TouchableOpacity>
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
    width: '100%',
    flexDirection: 'row',
  },
  nowTurnSite: {
    alignItems: 'flex-start',
  },
  btnRuleSite: {
    alignItems: 'flex-end',
  },
  btnRule: {
    width: 60,
    height: 30,
    backgroundColor: "#815E06",
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  sBoardV: {
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
  },
  sBoard: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    backgroundColor: "#000000",
  },
  sNameColumn: {
    width: '22%',
    flexDirection: 'column',
  },
  sNameCell:{
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
  },
  userScoreColumn: {
    width: '28%',
    flexDirection: 'column',
  },
  userScoreCell: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  totalScoreRow: {
    width: '100%',
    flexDirection: 'row',
  },
  totalCell: {
    width: '22%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
  },
  totalScoreCell: {
    width: '78%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
});