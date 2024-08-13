import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "./AccountScreen";
import NotificationsScreen from "./NotificationScreen";
import Icon from "react-native-vector-icons/Ionicons";
import AvatarTitle from "../components/AvatarTitle";
import { ImageBackground } from "react-native";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator();

const backgroundImage = { uri: "https://placehold.co/600x300/png" };

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "calendar";
          } else if (route.name === "Notifications") {
            iconName = "notifications";
          } else if (route.name === "Account") {
            iconName = "person";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#2ecc71",
        tabBarActiveBackgroundColor: "#2ecc71",
        tabBarStyle: { backgroundColor: "white" },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#00C673",
        },
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={NotificationsScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "red" },
        }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={AccountScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <AvatarTitle {...props} />,
          headerBackground: () => (
            <ImageBackground
              source={require("../asset/accountbackground.jpg")}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
