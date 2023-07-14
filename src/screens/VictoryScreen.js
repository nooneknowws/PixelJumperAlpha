import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import BG from "../assets/victorybg.jpg";
import CAT from "../assets/trophy.png";

const VictoryScreen = (props) => {
  const Return = () => {
    props.navigation.replace("Home");
  };
  const time = props.route.params.time;
  const username = props.route.params.username;

  return (
    <ImageBackground source={BG} style={styles.container}>
      <View style={{ flex: 5 }} />
      <View style={{ flex: 1 }} />

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.text}>Congratulations {username}, You Win!!</Text>
        <Text style={styles.text}>your Time: {time}</Text>
        <Image source={CAT} style={styles.cat} />
      </View>
      <View style={{ flex: 1 }} />
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
    color: "black",
    position: "relative",
    textAlign: "center",
    borderColor: "black",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 1,
    elevation: 3,
    backgroundColor: "white",
  },
});

export default VictoryScreen;
