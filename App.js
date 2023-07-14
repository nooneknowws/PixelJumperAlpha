import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import StageOne from "./src/screens/StageOne";
import StageTwo from "./src/screens/StageTwo";
import GameOver from "./src/screens/GameOver";
import StageThree from "./src/screens/StageThree";
import VictoryScreen from "./src/screens/VictoryScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StageOne" component={StageOne} />
        <Stack.Screen name="StageTwo" component={StageTwo} />
        <Stack.Screen name="StageThree" component={StageThree} />
        <Stack.Screen name="GameOver" component={GameOver} />
        <Stack.Screen name="VictoryScreen" component={VictoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
