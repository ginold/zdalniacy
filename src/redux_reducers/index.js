import { loggedReducer, userDataReducer } from './user';
import { notificationsReducer } from './notifications'

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';

const allReducers = (history) => combineReducers({
    router: connectRouter(history),
    isLogged: loggedReducer,
    userData: userDataReducer,
    notifications: notificationsReducer
})

export default allReducers