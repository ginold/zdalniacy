
const notifications = {
    notifications: [], unread: 0
}

export const notificationsReducer = (state = notifications, action) => {
    if (action.type === "SET_NOTIFICATIONS") {
        let notifications = action.payload
        let newNotifications = [...notifications, ...state.notifications]
        state = { ...state, notifications: newNotifications }

    } else if (action.type === "PUSH_NOTIFICATION") {
        let notification = action.payload
        let notifications = [notification, ...state.notifications]
        let unread = state.unread + 1
        state = { notifications, unread }

    } else if (action.type === "RESET_UNREAD") {
        state = { ...state, unread: 0 }
    }
    return state
}
