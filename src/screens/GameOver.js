import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import BG from "../assets/home.png";
import CAT from "../assets/CryingCat.png";

const GameOver = ({ navigation, props }) => {
  const Return = () => {
    navigation.replace("Home");
  };

  return (
    <ImageBackground source={BG} style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.text}>Game Over!!</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image source={CAT} style={styles.cat} />
      </View>
      <View style={{ flex: 1 }}>
        <Pressable title="Play Again?" onPress={Return} style={styles.button}>
          <Text style={styles.text}>Play Again?</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  cat: {
    width: 500,
    height: 500,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    position: "relative",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "lightblue",
  },
});

export default GameOver;
