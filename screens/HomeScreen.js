
import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, PermissionsAndroid } from "react-native";
import saveTokenToDatabase from "../utils/firebase";
import * as Notifications from "expo-notifications";
import {
  useNotificationAPI,
  useNotificationDispatch,
} from "../hooks/useNotification";
import { NOTIFICATION_ACTION_TYPE } from "../reducers/notificationReducer";
import FieldList from "./FieldList";

function HomeScreen({ navigation }) {
  const notificationDispatch = useNotificationDispatch();
  const notificationAPIs = useNotificationAPI();

  useEffect(() => {
    const requestPermissionsAndFetchToken = async () => {
      const permissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (permissionStatus !== "denied") {
        const deviceToken = await messaging().getToken();
        saveTokenToDatabase(deviceToken);
      }
    };

    requestPermissionsAndFetchToken().catch((error) => {
      console.error(error);
    });

    return messaging().onTokenRefresh((token) => {
      saveTokenToDatabase(token);
    });
  }, []);

  useEffect(() => {
    const setupNotificationHandler = async () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    };
    setupNotificationHandler();

    const handleNotificationClick = async (response) => {
      await notificationAPIs.readNotification(
        response?.notification?.request?.content?.data,
      );
    };

    const notificationClickSubscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationClick,
      );

    const getNotification = (remoteMessage) => ({
      id: remoteMessage.messageId,
      read: false,
      message: remoteMessage.notification.title,
      content: JSON.parse(remoteMessage.data.content),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    });

    const openAppFromBackgroundNotification = () => {
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        if (!remoteMessage) {
          return;
        }
        const data = getNotification(remoteMessage);
        await notificationAPIs.readNotification(data);
      });
    };
    openAppFromBackgroundNotification();

    const openAppFromQuitNotification = () => {
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            const data = getNotification(remoteMessage.data);
            await notificationAPIs.readNotification(data);
          }
        });
    };
    openAppFromQuitNotification();

    const dispatchNotification = (data) => {
      notificationDispatch({
        type: NOTIFICATION_ACTION_TYPE.PUSH,
        payload: {
          data,
        },
      });
    };

    const handleBackgroundNotification = () => {
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        const data = getNotification(remoteMessage);
        dispatchNotification(data);
      });
    };
    handleBackgroundNotification();

    const handleForegroundNotification = async (remoteMessage) => {
      if (!remoteMessage) {
        return;
      }
      const data = getNotification(remoteMessage);
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body || "",
        data,
      };

      dispatchNotification(data);

      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      });
    };

    const unsubscribe = messaging().onMessage(handleForegroundNotification);

    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, [navigation, notificationDispatch, notificationAPIs]);

  return (
  
      <FieldList />

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#2ecc71",
//   },
//   text: {
//     fontSize: 24,
//     color: "#fff",
//   },
// });

export default HomeScreen;
