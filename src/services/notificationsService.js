import { pushNotification, resetUnread } from '../redux_actions/notifications';
import { myStore } from '../index'

export default class NotificationsService {
    static getNotifications = () => {
        return myStore.getState().notifications;
    }
    static pushNotification = (notification) => {
        myStore.dispatch(pushNotification(notification))
    }
    static resetUnread = () => {
        myStore.dispatch(resetUnread())
    }
}
