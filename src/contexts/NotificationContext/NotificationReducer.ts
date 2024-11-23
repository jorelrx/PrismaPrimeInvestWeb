import { NotificationAction, NotificationState } from "./NotificationTypes";

export function notificationReducer(
    state: NotificationState,
    action: NotificationAction
): NotificationState {
    switch (action.type) {
        case "ADD_NOTIFICATION":
            return { ...state, notifications: [...state.notifications, action.payload] };
        case "REMOVE_NOTIFICATION":
            return {
                ...state,
                notifications: state.notifications.filter((n) => n.id !== action.payload),
            };
        default:
            return state;
    }
}