import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from './screens/HomeScreen';
import FloatingChatBubble from './components/FloatingChatBubble';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }} 
      >
        <Stack.Screen
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register" 
          component={RegisterScreen}
        />
      </Stack.Navigator>
      <FloatingChatBubble />
    </NavigationContainer>
  );
}

