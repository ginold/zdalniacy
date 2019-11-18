import { loggedReducer, userDataReducer } from './user';
import { notificationsReducer } from './notifications'
import { jobsReducer } from './jobs'

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';

const allReducers = (history) => combineReducers({
    router: connectRouter(history),
    isLogged: loggedReducer,
    userData: userDataReducer,
    notifications: notificationsReducer,
    jobs: jobsReducer
})

export default allReducers