import React from "react";
import NotificationsScreen from "./NotificationScreen";
import { FontAwesome as Icon } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import AccountNavigation from "./AccountNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNotification } from "../hooks/useNotification";
import FieldNavigation from "./FieldNavigation";

const ICONS = {
    Home: "calendar",
    Notification: "bell",
    AccountNavigation: "user-circle",
};

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
    const notification = useNotification();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icon name={ICONS[route.name]} size={size} color={color} />;
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
                name="Home"
                component={FieldNavigation}
                options={{
                    tabBarLabel: "Trang chủ",
                    headerShown: false, // Ẩn header
                }}
            />
            <Tab.Screen
                name="Notification"
                component={NotificationsScreen}
                options={{
                    tabBarLabel: "Thông báo",
                    tabBarBadge: notification.badge > 0 ? notification.badge : null,
                    tabBarBadgeStyle: { backgroundColor: "red" },
                    headerTitle: "Thông báo",
                }}
            />
            <Tab.Screen
                name="AccountNavigation"
                component={AccountNavigation}
                options={{
                    tabBarLabel: "Tài khoản",
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigation;
