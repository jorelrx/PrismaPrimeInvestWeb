export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
}

export interface NotificationState {
    notifications: Notification[];
}

export const initialState: NotificationState = {
    notifications: [],
};

export type NotificationAction =
    | { type: "ADD_NOTIFICATION"; payload: Notification }
    | { type: "REMOVE_NOTIFICATION"; payload: string };