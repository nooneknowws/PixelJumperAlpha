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
import BG from "../assets/mountainbg.png";
import PlatformsIce from "../objects/PlatformsIce";
import FloorIce from "../objects/FloorIce";
import Obstacles from "../objects/Obstacles";
import EnemyIce from "../objects/EnemyIce";

const { width, height } = Dimensions.get("window");
const MCSize = 40;
const FloorSize = 100;

const initialEnemy = Matter.Bodies.rectangle(
  width * 0.2,
  width * 0.8,
  MCSize,
  MCSize,
  { frictionAir: 0.02 }
);
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
const obstacle1 = Matter.Bodies.rectangle(
  width * 0.9,
  height * 0.22,
  MCSize / 2,
  MCSize / 2,
  { isStatic: true }
);
const obstacle2 = Matter.Bodies.rectangle(
  width * 0.2,
  height * 0.77,
  MCSize / 2,
  MCSize / 2,
  { isStatic: true }
);
const platform1 = Matter.Bodies.rectangle(
  width * 0.96,
  height * 0.9,
  width * 0.4,
  30,
  { isStatic: true }
);
const platform2 = Matter.Bodies.rectangle(
  width * 0.2,
  height * 0.75,
  width * 0.6,
  30,
  { isStatic: true }
);
const platform3 = Matter.Bodies.rectangle(
  width * 0.7,
  height * 0.6,
  width * 0.4,
  30,
  { isStatic: true }
);

const platform4 = Matter.Bodies.rectangle(
  width * 0.3,
  height * 0.4,
  width * 0.3,
  30,
  { isStatic: true }
);
const platform5 = Matter.Bodies.rectangle(
  width * 0.9,
  height * 0.2,
  width * 0.6,
  30,
  { isStatic: true }
);
platform1.render.visible = false;
platform2.render.visible = false;
platform3.render.visible = false;
platform4.render.visible = false;
platform5.render.visible = false;
Matter.World.add(world, [
  initialEnemy,
  initialCharacter,
  floor,
  leftWall,
  rightWall,
  platform2,
  platform1,
  platform3,
  platform4,
  platform5,
  obstacle1,
  obstacle2,
]);

export default class StageTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jumping: false,
      lastJumpTime: null,
      time: props.route.params.time,
    };
  }
  handleVictory = () => {
    this.setState({
      running: false,
    });
    this.props.navigation.replace("VictoryScreen", {
      time: this.state.time,
      username: this.username,
    });
  };
  username = this.props.route.params.username;
  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time + 1 }));
    }, 1000);
    Matter.Body.setPosition(initialCharacter, {
      x: (width - MCSize) / 2,
      y: height,
      frictionAir: 0.04,
    });
    Matter.Body.setPosition(initialEnemy, {
      x: width * 0.8,
      y: width * 0.6,
      frictionAir: 0.07,
    });
  }
  GameOver = () => {
    this.setState({
      running: false,
    });
    this.props.navigation.replace("GameOver", {
      replace: true,
    });
  };
  onEvent = (e) => {
    if (e.type === "game-over") {
      this.GameOver();
    }
  };
  jumpCharacter = () => {
    const currentTime = new Date().getTime();
    const { jumping, lastJumpTime } = this.state;
    if (!jumping && (!lastJumpTime || currentTime - lastJumpTime > 700)) {
      Matter.Body.setVelocity(initialCharacter, {
        x: initialCharacter.velocity.x,
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
            onEvent={this.onEvent}
            running={this.state.running}
            entities={{
              physics: {
                engine: engine,
                world: world,
              },
              initialEnemy: {
                body: initialEnemy,
                size: [MCSize, MCSize],
                color: "red",
                renderer: EnemyIce,
              },
              initialCharacter: {
                body: initialCharacter,
                size: [MCSize, MCSize],
                color: "blue",
                renderer: MainCharacter,
              },
              floor: {
                body: floor,
                size: [width, FloorSize],
                color: "green",
                renderer: FloorIce,
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
                size: [width * 0.4, 30],
                color: "blue",
                renderer: PlatformsIce,
              },
              platform2: {
                body: platform2,
                size: [width * 0.6, 30],
                color: "blue",
                renderer: PlatformsIce,
              },
              platform3: {
                body: platform3,
                size: [width * 0.4, 30],
                color: "blue",
                renderer: PlatformsIce,
              },
              platform4: {
                body: platform4,
                size: [width * 0.3, 30],
                color: "blue",
                renderer: PlatformsIce,
              },
              platform5: {
                body: platform5,
                size: [width * 0.6, 30],
                color: "blue",
                renderer: PlatformsIce,
              },
              obstacle1: {
                body: obstacle1,
                size: [MCSize, MCSize],
                color: "blue",
                renderer: Obstacles,
              },
              obstacle2: {
                body: obstacle2,
                size: [MCSize, MCSize],
                color: "blue",
                renderer: Obstacles,
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
    color: "black",
  },
});
const Physics = (entities, { time, dispatch }) => {
  let engine = entities["physics"].engine;
  let enemy = entities["initialEnemy"].body;
  let mc = entities["initialCharacter"].body;
  let spike1 = entities["obstacle1"].body;
  let spike2 = entities["obstacle2"].body;

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      if (
        (pair.bodyA === mc && pair.bodyB === enemy) ||
        (pair.bodyA === enemy && pair.bodyB === mc)
      ) {
        dispatch({
          type: "game-over",
        });
      }
    }
  });
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      if (
        (pair.bodyA === mc && pair.bodyB === spike1) ||
        (pair.bodyA === spike1 && pair.bodyB === mc)
      ) {
        dispatch({
          type: "game-over",
        });
      }
    }
  });
  Matter.Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      if (
        (pair.bodyA === mc && pair.bodyB === spike2) ||
        (pair.bodyA === spike2 && pair.bodyB === mc)
      ) {
        dispatch({
          type: "game-over",
        });
      }
    }
  });

  return entities;
};
