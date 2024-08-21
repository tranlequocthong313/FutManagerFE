import React from "react";
import FieldStatusHistoryStats from "./FieldStatusHistoryStats";
import AccountScreen from "./AccountScreen";
import ReviewScreen from "./ReviewScreen"; // Thêm import cho ReviewScreen
import AboutScreen from "./AboutScreen"; // Thêm import cho AboutScreen
import HelpScreen from "./HelpScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import AvatarTitle from "../components/AvatarTitle";
import { ImageBackground } from "expo-image";

const Stack = createStackNavigator();

export default function AccountNavigation() {
  return (
    <Stack.Navigator initialRouteName={"Account"}>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <AvatarTitle {...props} />,
          headerBackground: () => (
            <ImageBackground
              source={{
                uri: "https://res.cloudinary.com/diojasks1/image/upload/v1723804779/tycwpxoyw3mha6aoqqzd.jpg",
              }}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <Stack.Screen
        name="FieldStatusHistoryStats"
        component={FieldStatusHistoryStats}
        options={{
          headerTitle: "Thống kê tình trạng sân",
          headerTitleAlign: "center",
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
      />
      <Stack.Screen
        name="ReviewScreen" // Tên của màn hình mới
        component={ReviewScreen} // Component ReviewScreen
        options={{
          headerTitle: "Đánh giá sân",
          headerTitleAlign: "center",
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
      />
       <Stack.Screen
        name="AboutScreen" // Tên của màn hình mới
        component={AboutScreen} // Component ReviewScreen
        options={{
          headerTitle: "Giới thiệu",
          headerTitleAlign: "center",
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
      />
         <Stack.Screen
        name="HelpScreen" // Tên của màn hình mới
        component={HelpScreen} // Component ReviewScreen
        options={{
          headerTitle: "Trợ giúp",
          headerTitleAlign: "center",
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
      />
    </Stack.Navigator>
  );
}
