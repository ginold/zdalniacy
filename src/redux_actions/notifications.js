export const setNotifications = (notifications) => {
    return {
        type: "SET_NOTIFICATIONS",
        payload: notifications
    }
}
export const pushNotification = (notification) => {
    return {
        type: "PUSH_NOTIFICATION",
        payload: notification
    }
}
export const deleteNotification = (index) => {
    return {
        type: "DELETE_NOTIFICATION",
        payload: index
    }
}
export const resetUnread = () => {
    return {
        type: "RESET_UNREAD"
    }
}