import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import Dice01 from "./Imgs/Dice01.png";
import Dice02 from "./Imgs/Dice02.png";
import Dice03 from "./Imgs/Dice03.png";
import Dice04 from "./Imgs/Dice04.png";
import Dice05 from "./Imgs/Dice05.png";
import Dice06 from "./Imgs/Dice06.png";

export default function DiceBox () {
  const [D01IsLocked, setD01IsLocked] = useState(true);
  const [D02IsLocked, setD02IsLocked] = useState(true);
  const [D03IsLocked, setD03IsLocked] = useState(true);
  const [D04IsLocked, setD04IsLocked] = useState(true);
  const [D05IsLocked, setD05IsLocked] = useState(true);
  
  const [rollChance, setChanceCount] = useState(3);
  
  // 주사위 5개를 랜덤으로 띄워서 변수에 저장
  let randD01 = Math.floor(Math.random()*6) + 1;
  let randD02 = Math.floor(Math.random()*6) + 1;
  let randD03 = Math.floor(Math.random()*6) + 1;
  let randD04 = Math.floor(Math.random()*6) + 1;
  let randD05 = Math.floor(Math.random()*6) + 1;

  let [reRollD01, setReRollD01] = useState();
  let [reRollD02, setReRollD02] = useState();
  let [reRollD03, setReRollD03] = useState();
  let [reRollD04, setReRollD04] = useState();
  let [reRollD05, setReRollD05] = useState();
  
  // Roll버튼 클릭시 랜덤 주사위 굴리기
  let [rolledDice01, setRolledDice01] = useState();
  let [rolledDice02, setRolledDice02] = useState();
  let [rolledDice03, setRolledDice03] = useState();
  let [rolledDice04, setRolledDice04] = useState();
  let [rolledDice05, setRolledDice05] = useState();
  
  useEffect(()=>{
    switch (randD01) {
      case 1: setRolledDice01(Dice01);
        break;
      case 2: setRolledDice01(Dice02);
        break;
      case 3: setRolledDice01(Dice03);
        break;
      case 4: setRolledDice01(Dice04);
        break;
      case 5: setRolledDice01(Dice05);
        break;
      case 6: setRolledDice01(Dice06);
        break;
    }
    switch (randD02) {
      case 1: setRolledDice02(Dice01);
      break;
      case 2: setRolledDice02(Dice02);
        break;
      case 3: setRolledDice02(Dice03);
        break;
      case 4: setRolledDice02(Dice04);
        break;
      case 5: setRolledDice02(Dice05);
        break;
      case 6: setRolledDice02(Dice06);
        break;
    }
    switch (randD03) {
      case 1: setRolledDice03(Dice01);
        break;
      case 2: setRolledDice03(Dice02);
        break;
      case 3: setRolledDice03(Dice03);
        break;
      case 4: setRolledDice03(Dice04);
        break;
      case 5: setRolledDice03(Dice05);
        break;
      case 6: setRolledDice03(Dice06);
        break;
    }
    switch (randD04) {
      case 1: setRolledDice04(Dice01);
        break;
      case 2: setRolledDice04(Dice02);
        break;
      case 3: setRolledDice04(Dice03);
        break;
      case 4: setRolledDice04(Dice04);
        break;
      case 5: setRolledDice04(Dice05);
        break;
      case 6: setRolledDice04(Dice06);
        break;
    }
    switch (randD05) {
      case 1: setRolledDice05(Dice01);
        break;
      case 2: setRolledDice05(Dice02);
        break;
      case 3: setRolledDice05(Dice03);
        break;
      case 4: setRolledDice05(Dice04);
        break;
      case 5: setRolledDice05(Dice05);
        break;
      case 6: setRolledDice05(Dice06);
        break;
    }
  }, [rollChance]);
  
  return (
    <>
    <View style={styles.diceBox}>
      <View style={styles.boxSquare}>
        <View style={(D01IsLocked == false ? styles.lockedDice : styles.diceImg)}>
          <TouchableHighlight onPress={()=>setD01IsLocked(D01IsLocked == false ? true : false)}>
            {(3 > rollChance > 0 ? <Image source={rolledDice01}/> : <></>)}
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.boxSquare}>
        <View style={(D02IsLocked == false ? styles.lockedDice : styles.diceImg)}>
          <TouchableHighlight onPress={()=>setD02IsLocked(D02IsLocked == false ? true : false)}>
            {(3 > rollChance > 0 ? <Image source={rolledDice02}/> : <></>)}
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.boxSquare}>
        <View style={(D03IsLocked == false ? styles.lockedDice : styles.diceImg)}>
          <TouchableHighlight onPress={()=>setD03IsLocked(D03IsLocked == false ? true : false)}>
            {(3 > rollChance > 0 ? <Image source={rolledDice03}/> : <></>)}
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.boxSquare}>
        <View style={(D04IsLocked == false ? styles.lockedDice : styles.diceImg)}>
          <TouchableHighlight onPress={()=>setD04IsLocked(D04IsLocked == false ? true : false)}>
            {(3 > rollChance > 0 ? <Image source={rolledDice04}/> : <></>)}
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.boxSquare}>
        <View style={(D05IsLocked == false ? styles.lockedDice : styles.diceImg)}>
          <TouchableHighlight onPress={()=>setD05IsLocked(D05IsLocked == false ? true : false)}>
            {(3 > rollChance > 0 ? <Image source={rolledDice05}/> : <></>)}
          </TouchableHighlight>
        </View>
      </View>
    </View>
    <View style={styles.btnRollSite}>
      <TouchableOpacity
        style={styles.btnRoll}
        activeOpacity={0.9}
        onPress={() => {setChanceCount(rollChance > 0 ? rollChance -1 : rollChance)}}
      >
        <Text style={styles.btnRollTxt}>Roll</Text>
        <Text style={styles.CountTxt}>{rollChance}</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  diceBox: {
    width: '100%',
    height: 80,
    backgroundColor: '#815E06',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#61490E',
    marginHorizontal: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceImg: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#61490E',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  btnRollSite: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRoll: {
    width: 120,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#815E06',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
  },
  btnRollTxt: {
    fontSize: 25,
    color: '#FFFFFF',
    marginRight: 10,
  },
  CountTxt: {
    fontSize: 25,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  lockedDice: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#61490E',
    borderWidth: 3,
    borderRadius: 9,
    borderColor: '#F9E42F',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  }
});