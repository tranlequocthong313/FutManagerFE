import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import FloatingChatBubble from "./components/FloatingChatBubble";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import UserProvider from "./providers/UserProvider";
import BottomTabNavigation from "./screens/BottomTabNavigation";
import { navigationRef } from "./utils/RootNavigation";
import NotificationProvider from "./providers/NotificationProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Entypo: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Entypo.ttf"),
    EvilIcons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/EvilIcons.ttf"),
    Feather: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf"),
    FontAwesome: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf"),
    FontAwesome5_Brands: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf"),
    FontAwesome5_Regular: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf"),
    FontAwesome5_Solid: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf"),
    FontAwesome6_Brands: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Brands.ttf"),
    FontAwesome6_Regular: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Regular.ttf"),
    FontAwesome6_Solid: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome6_Solid.ttf"),
    Fontisto: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Fontisto.ttf"),
    Foundation: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Foundation.ttf"),
    Ionicons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
    MaterialCommunityIcons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf"),
    MaterialIcons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf"),
    Octicons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf"),
    SimpleLineIcons: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/SimpleLineIcons.ttf"),
    Zocial: require("./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Zocial.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <UserProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName={"BottomTabNavigation"}
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#2ecc71",
                tabBarActiveBackgroundColor: "#2ecc71",
                tabBarStyle: { backgroundColor: "white" },
                headerTitleAlign: "center",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#00C673",
                },
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
      </NotificationProvider>
    </SafeAreaProvider>
  );
}