import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { authHTTP, notificationEndpoints } from "../configs/apis";
import { isCloseToBottom } from "../utils/utils";
import NotificationItem from "../components/NotificationItem";
import {
  useNotification,
  useNotificationAPI,
  useNotificationDispatch,
} from "../hooks/useNotification";
import { NOTIFICATION_ACTION_TYPE } from "../reducers/notificationReducer";

function NotificationsScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useNotificationDispatch();
  const { data: notifications, limit, offset } = useNotification();
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [url, setUrl] = useState(notificationEndpoints.notifications);
  const [isNext, setIsNext] = useState(false);

  const getQueries = (url) => {
    if (!url) {
      return {};
    }
    const { searchParams } = new URL(url);
    if (searchParams) {
      return Object.fromEntries([...searchParams.entries()]);
    }
    return {};
  };

  useEffect(() => {
    loadNotifications();
  }, [dispatch, url, isNext]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await (await authHTTP()).get(url);
      const { limit: _limit, offset: _offset } = getQueries(res.data.next);
      dispatch({
        type: isNext
          ? NOTIFICATION_ACTION_TYPE.INFINITE_SCROLL
          : NOTIFICATION_ACTION_TYPE.LOAD,
        payload: {
          badge: res.data.badge,
          data: res.data.results,
          limit: Number(_limit),
          offset: Number(_offset),
        },
      });
      setNextPageUrl(res.data.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreNotifications = ({ nativeEvent }) => {
    if (nextPageUrl && !loading && isCloseToBottom(nativeEvent)) {
      setIsNext(true);
      setUrl(
        `${notificationEndpoints.notifications}?limit=${String(limit)}&offset=${String(offset)}`,
      );
    }
  };

  return (
    <ScrollView onScroll={loadMoreNotifications}>
      <RefreshControl onRefresh={loadNotifications} />
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      {loading && <ActivityIndicator />}
    </ScrollView>
  );
}

export default NotificationsScreen;
