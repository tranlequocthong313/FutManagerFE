import { useEffect, useMemo, useReducer } from "react";
import {
    NotificationContext,
    NotificationDispatchContext,
    NotificationAPIContext,
} from "../contexts/NotificationContext";
import notificationReducer, {
    NOTIFICATION_ACTION_TYPE,
    initialNotificationState,
} from "../reducers/notificationReducer";
import { authHTTP, notificationEndpoints } from "../configs/apis";
import { useUser } from "../hooks/useUser";
// import { SCREEN_MAPPINGS } from '~/utils/constants'; // TODO: Add Screen Mappings

export default function NotificationProvider({ children }) {
    const [notifications, dispatch] = useReducer(
        notificationReducer,
        initialNotificationState,
    );
    const user = useUser()

    const readNotification = async (notification) => {
        if (!notification) {
            return;
        }
        try {
            const r = await (
                await authHTTP()
            ).post(notificationEndpoints.readNotification, {
                notification_content_id: notification.content.id,
            });
            if (r.status === 200) {
                dispatch({
                    type: NOTIFICATION_ACTION_TYPE.READ,
                    payload: { id: notification.id },
                });
                // TODO: handle navigate Screen Mappings
                // RootNavigation.navigate(
                //   SCREEN_MAPPINGS[notification?.content?.entity_type],
                //   {
                //     id: notification?.content?.entity_id,
                //   },
                // );
            }
        } catch (error) {
            console.error("READ Notification Failed:::", error);
        }
    };

    const loadBadge = async () => {
        try {
            const url = `${notificationEndpoints.notifications}`;
            const res = await (await authHTTP()).get(url);
            dispatch({
                type: NOTIFICATION_ACTION_TYPE.UPDATE_BADGE,
                payload: { badge: res.data.badge },
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadBadge();
    }, [user]);

    const apis = useMemo(() => ({ readNotification }), []);

    return (
        <NotificationContext.Provider value={notifications}>
            <NotificationDispatchContext.Provider value={dispatch}>
                <NotificationAPIContext.Provider value={apis}>
                    {children}
                </NotificationAPIContext.Provider>
            </NotificationDispatchContext.Provider>
        </NotificationContext.Provider>
    );
}
