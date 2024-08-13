import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from './screens/HomeScreen';
import FloatingChatBubble from "./components/FloatingChatBubble";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import UserProvider from "./providers/UserProvider";
import { UserContext } from "./contexts/UserContext";
import BottomTabNavigation from "./screens/BottomTabNavigation";

const Stack = createStackNavigator();

export default function App() {
  const user = useContext(UserContext);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
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
