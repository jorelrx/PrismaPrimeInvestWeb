"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import { initialState, Notification, NotificationType } from "./NotificationTypes";
import { notificationReducer } from "./NotificationReducer";

const NotificationContext = createContext<{
    notifications: Notification[];
    addNotification: (type: NotificationType, message: string) => void;
    removeNotification: (id: string) => void;
}>({
    notifications: [],
    addNotification: () => {},
    removeNotification: () => {}
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState);

    const addNotification = useCallback((type: NotificationType, message: string) => {
        const id = Math.random().toString(36).substring(7);
        dispatch({ type: "ADD_NOTIFICATION", payload: { id, type, message } });

        setTimeout(() => {
            dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
        }, 5000);
    }, []);

    const removeNotification = useCallback((id: string) => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications: state.notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
