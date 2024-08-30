import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ReviewScreen from "./ReviewScreen";
import FieldBooking from "./FieldBooking";
import FieldInfor from "./FieldInfor";
import FieldPayment from "./FieldPayment";
import WebViewScreen from "./WebViewScreen";
import FieldSuccess from "./FieldSuccess";

const Stack = createStackNavigator();

export default function FieldNavigation() {
    return (
        <Stack.Navigator initialRouteName={HomeScreen}>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ReviewScreen"
                component={ReviewScreen}
                options={{
                    headerTitle: "Đánh giá",
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
                name="FieldBooking"
                component={FieldBooking}
                options={{
                    headerTitle: "Đặt sân",
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
                name="FieldInfor"
                component={FieldInfor}
                options={{
                    headerTitle: "Đặt sân",
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
                name="FieldPayment"
                component={FieldPayment}
                options={{
                    headerTitle: "Thanh Toán",
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
                name="WebViewScreen"
                component={WebViewScreen}
                options={{
                    headerTitle: "Màn hình thanh toán",
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
                name="FieldSuccess"
                component={FieldSuccess}
                options={{
                    headerShown: false,
                }}
            /> 
        </Stack.Navigator>
    );
}
