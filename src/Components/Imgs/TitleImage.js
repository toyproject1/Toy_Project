import React from "react";
import { Image, StyleSheet } from "react-native";

export default function TitleImage() {
    return(
        <Image style={styles.image}
            source={require('./assets/favicon.png')}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 210,
    },
});