import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  Text,
} from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import MainCharacter from "../objects/MainCharacter";
import LeftButton from "../components/LeftButton";
import RightButton from "../components/RightButton";
import JumpButton from "../components/JumpButton";
import Floor from "../objects/Floor";
import Platforms from "../objects/Platforms";
import BG from "../assets/florestaback3.png";

const { width, height } = Dimensions.get("window");
const MCSize = 40;
const FloorSize = 100;
const initialCharacter = Matter.Bodies.rectangle(
  (width - MCSize) / 2,
  height,
  MCSize,
  MCSize,
  { frictionAir: 0.04 }
);
initialCharacter.render.visible = false;
const floor = Matter.Bodies.rectangle(width / 2, height, width, FloorSize, {
  isStatic: true,
});

const engine = Matter.Engine.create({ enableSleeping: true });
const world = engine.world;

const leftWall = Matter.Bodies.rectangle(-10, height / 2, 10, height, {
  isStatic: true,
  render: { visible: false },
});
const rightWall = Matter.Bodies.rectangle(width + 10, height / 2, 10, height, {
  isStatic: true,
  render: { visible: false },
});
const platform1 = Matter.Bodies.rectangle(
  width * 0.4,
  height * 0.8,
  width * 0.4,
  20,
  { isStatic: true }
);
const platform2 = Matter.Bodies.rectangle(
  width * 0.7,
  height * 0.6,
  width * 0.4,
  20,
  { isStatic: true }
);
const platform3 = Matter.Bodies.rectangle(
  width * 0.2,
  height * 0.45,
  width * 0.2,
  20,
  { isStatic: true }
);

const platform4 = Matter.Bodies.rectangle(
  width * 0.7,
  height * 0.3,
  width * 0.3,
  20,
  { isStatic: true }
);
const platform5 = Matter.Bodies.rectangle(
  width * 0.8,
  height * 0.15,
  width * 0.2,
  20,
  { isStatic: true }
);
platform1.render.visible = false;
platform2.render.visible = false;
platform3.render.visible = false;
platform4.render.visible = false;
platform5.render.visible = false;
Matter.World.add(world, [
  initialCharacter,
  floor,
  leftWall,
  rightWall,
  platform2,
  platform1,
  platform3,
  platform4,
  platform5,
]);

export default class StageOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jumping: false,
      running: props.route.params.running,
      time: props.route.params.time,
    };
  }
  username = this.props.route.params.username;
  handleVictory = () => {
    this.setState({
      running: false,
    });
    this.props.navigation.replace("StageTwo", {
      time: this.state.time,
      username: this.username,
    });
  };
  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time + 1 }));
    }, 1000);
    Matter.Body.setPosition(initialCharacter, {
      x: (width - MCSize) / 2,
      y: height,
    });
  }

  jumpCharacter = () => {
    const currentTime = new Date().getTime();
    const { jumping, lastJumpTime } = this.state;
    if (!jumping && (!lastJumpTime || currentTime - lastJumpTime > 700)) {
      Matter.Body.setVelocity(initialCharacter, {
        x: 0,
        y: -20,
      });
      if (initialCharacter.position.y <= 0) {
        this.handleVictory();
      }
      this.setState({ jumping: false, lastJumpTime: currentTime });
    }
  };

  moveCharacter = (direction) => {
    const force = direction === "right" ? 0.01 : -0.01;
    Matter.Body.applyForce(initialCharacter, initialCharacter.position, {
      x: force,
      y: 0,
    });
  };

  render() {
    const { time } = this.state;
    return (
      <ImageBackground source={BG} style={styles.container}>
        <View style={styles.gameContainer}>
          <GameEngine
            systems={[Physics]}
            running={this.state.running}
            onEvent={this.onEvent}
            entities={{
              physics: {
                engine: engine,
                world: world,
              },
              initialCharacter: {
                body: initialCharacter,
                size: [MCSize, MCSize],
                color: "red",
                renderer: MainCharacter,
              },
              floor: {
                body: floor,
                size: [width, FloorSize],
                color: "green",
                renderer: Floor,
              },
              leftButton: {
                body: null,
                size: [50, 50],
                color: "blue",
                renderer: () => (
                  <LeftButton onPress={() => this.moveCharacter("left")} />
                ),
              },
              rightButton: {
                body: null,
                size: [50, 50],
                color: "blue",
                renderer: () => (
                  <RightButton onPress={() => this.moveCharacter("right")} />
                ),
              },
              jumpButton: {
                body: null,
                size: [50, 50],
                color: "green",
                renderer: () => (
                  <JumpButton onPress={() => this.jumpCharacter()} />
                ),
              },
              leftWall: {
                body: leftWall,
                render: { visible: true },
                color: "red",
              },
              rightWall: {
                body: rightWall,
                render: { visible: true },
                color: "red",
              },
              platform1: {
                body: platform1,
                size: [width * 0.4, 25],
                color: "blue",
                renderer: Platforms,
              },
              platform2: {
                body: platform2,
                size: [width * 0.4, 25],
                color: "blue",
                renderer: Platforms,
              },
              platform3: {
                body: platform3,
                size: [width * 0.2, 25],
                color: "blue",
                renderer: Platforms,
              },
              platform4: {
                body: platform4,
                size: [width * 0.3, 25],
                color: "blue",
                renderer: Platforms,
              },
              platform5: {
                body: platform5,
                size: [width * 0.2, 25],
                color: "blue",
                renderer: Platforms,
              },
            }}
          >
            <StatusBar hidden={true} />
          </GameEngine>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>Time: {time}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  gameContainer: {
    flex: 1,
  },
  timerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    alignItems: "center",
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

const Physics = (entities, { time, dispatch }) => {
  let engine = entities["physics"].engine;
  let world = entities["physics"].world;

  Matter.Engine.update(engine, time.delta);

  return entities;
};
