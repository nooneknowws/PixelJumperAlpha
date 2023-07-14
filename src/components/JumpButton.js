import React from "react";
import { TouchableOpacity, Image } from "react-native";
import IMG from "../assets/jump.png";

const JumpButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: "absolute", bottom: 0, left: 320 }}
    >
      <Image
        source={IMG}
        style={{
          height: 50,
          width: 50,
        }}
      />
    </TouchableOpacity>
  );
};

export default JumpButton;
