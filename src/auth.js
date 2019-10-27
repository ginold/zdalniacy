import { signOut, signIn, setUserData } from './redux_actions';
import { myStore } from './index'

export default class Auth {
    static signOut = () => {
        myStore.dispatch(signOut())
        localStorage.removeItem('userData')
    }
    static signIn = () => {
        console.log('sign in')
        myStore.dispatch(signIn())
    }
    static setUserData = (data) => {
        if (data) {
            myStore.dispatch(setUserData(data))
            localStorage.setItem('userData', JSON.stringify(data))
        }
    }
    static isAuthenticated = () => {
        console.log('is auth')
        return myStore.getState().isLogged;
    }
    static getUserType = () => {
        return myStore.getState().userData.userType;
    }

}
