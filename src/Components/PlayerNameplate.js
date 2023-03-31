import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { io } from "socket.io-client";

export default function PlayerNameplate() {
  // const players = [{"player01":0}, {"player02":0}, {"player03":0}, {"player04":0}];
  let player = players.players;
  // const socket = io("http://3.38.165.165:3131");
  // socket.on(refreshUserList, (data) = {

  // })
  return (
    <>
      {player.map((content, i) => {
        return (
          <View style={styles.PNameplateSite} key={i}>
            <View style={styles.PNameplate}>
              <Text style={styles.plateTxt}>{content.name}</Text>
            </View>
            <View>
              <Text style={styles.scoreTxt}>{content.score}</Text>
            </View>
          </View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  PNameplateSite: {
    marginVertical: 5,
    alignItems: "center",
  },
  PNameplate: {
    width: 80,
    height: 30,
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
    backgroundColor: "#815E06",
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
});
