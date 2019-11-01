import { signOut, signIn, setUserData, setPoints } from '../redux_actions/user';
import { myStore } from '../index'
import axios from '../axios'

export default class Auth {
    static signOut = () => {
        myStore.dispatch(signOut())
        myStore.dispatch(setUserData({}))
        localStorage.removeItem('userData')
        window.location = "/";
    }
    static signIn = () => {
        myStore.dispatch(signIn())
    }
    static setUserData = (data) => {
        if (data) {
            myStore.dispatch(setUserData(data))
            localStorage.setItem('userData', JSON.stringify(data))
        }
    }
    static getUserData = () => {
        return myStore.getState().userData;
    }
    static addPoints = (amount) => {
        let points = myStore.getState().userData.points
        points += amount
        myStore.dispatch(setPoints(points))
    }
    static getPoints = () => {
        return myStore.getState().userData.points
    }
    static isAuthenticated = () => {
        return myStore.getState().isLogged;
    }
    static getUserType = () => {
        return myStore.getState().userData.userType;
    }
    static login = async (data) => {
        return await axios.post('/users/login', data)
    }
    static getUnlockedLessons = () => {
        return myStore.getState().userData.unlockedLessons
    }
    static getUserId = () => {
        return myStore.getState().userData._id
    }
    static createAccount = async (data) => {
        return await axios.post('/users/add', data)
    }
}
