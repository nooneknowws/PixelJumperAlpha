import React, { Component } from "react";
import { Image } from "react-native";
import { array, object, string } from "prop-types";
import IMG from "../assets/iceenemy.png";

export default class EnemyIce extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image
        source={IMG}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          resizeMode: "stretch",
        }}
      />
    );
  }
}

EnemyIce.propTypes = {
  size: array,
  body: object,
  color: string,
};
