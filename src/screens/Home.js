import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import ICON from "../assets/mainCharacterSprite.png";
import BACKGROUND from "../assets/home.png";
import PLAY from "../assets/play.png";

export default Home = ({ navigation }) => {
  const [username, setUsername] = useState("");
  return (
    <ImageBackground source={BACKGROUND} style={styles.container}>
      <Image source={ICON} style={styles.image}></Image>
      <Text style={styles.text}>Welcome to PixelJumper</Text>
      <Text style={styles.text}>Type your Name</Text>
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={(t) => setUsername(t)}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.replace("StageOne", {
            time: 0,
            username: username,
            running: true,
          });
        }}
      >
        <Image source={PLAY} style={styles.playButton} />
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71C5CF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  image: {
    height: 200,
    width: 200,
  },
  playButton: {
    marginTop: 32,
    width: 120,
    height: 74,
  },
  textInput: {
    borderWidth: 2,
    margin: 20,
    borderColor: "#008",
    borderRadius: 20,
    padding: 20,
    fontSize: 20,
    backgroundColor: "lightblue",
  },
});
