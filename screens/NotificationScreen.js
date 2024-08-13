import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { authHTTP, notificationEndpoints } from "../configs/apis";
import { isCloseToBottom } from "../utils/utils";
import NotificationItem from "../components/NotificationItem";

function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, [page]);

  const loadNotifications = async () => {
    if (page <= 0) {
      return;
    }

    try {
      setLoading(true);
      const url = `${notificationEndpoints.notifications}?page=${page}`;
      const res = await (await authHTTP()).get(url);
      if (page === 1) {
        setNotifications(res.data.results);
      } else if (page > 1) {
        setNotifications((prev) => [...prev, ...res.data.results]);
      }
      if (res.data.next === null) {
        setPage(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNotifications = ({ nativeEvent }) => {
    if (!loading && isCloseToBottom(nativeEvent)) {
      setPage(page + 1);
    }
  };

  return (
    <ScrollView onScroll={loadMoreNotifications}>
      <RefreshControl onRefresh={loadNotifications} />
      {loading && <ActivityIndicator />}
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      {loading && page > 1 && <ActivityIndicator />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ecc71",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});

export default NotificationsScreen;
