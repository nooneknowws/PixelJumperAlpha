import React from "react";
import { TouchableOpacity, Image } from "react-native";
import IMG from "../assets/left.png";

const LeftButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: "absolute", bottom: 0, left: 20 }}
    >
      <Image
        source={IMG}
        style={{
          width: 50,
          height: 50,
        }}
      />
    </TouchableOpacity>
  );
};

export default LeftButton;
