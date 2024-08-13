import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from './screens/HomeScreen';
import FloatingChatBubble from "./components/FloatingChatBubble";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import UserProvider from "./providers/UserProvider";
import BottomTabNavigation from "./screens/BottomTabNavigation";
import { navigationRef } from "./utils/RootNavigation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={"BottomTabNavigation"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNavigation}
          />
        </Stack.Navigator>
        <FloatingChatBubble />
      </NavigationContainer>
    </UserProvider>
  );
}
