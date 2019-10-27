import {loggedReducer, userDataReducer} from './user';

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux';

const allReducers = (history) => combineReducers({
    router: connectRouter(history),
    isLogged: loggedReducer,
    userData: userDataReducer
})

export default allReducers