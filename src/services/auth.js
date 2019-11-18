import { signOut, signIn, setUserData, setPoints, addTotalPoints } from '../redux_actions/user';
import { myStore } from '../index'
import axios from '../axios'

export default class Auth {
    static signInIfRemembered = () => {
        const data = window.localStorage.userData
        if (data) {
            this.setUserData(window.JSON.parse(data))
            this.signIn()
        }
    }
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
        }
    }
    static rememberMe = () => {
        localStorage.setItem('userData', JSON.stringify(this.getUserData()))
    }
    static getSavedJobs = () => {
        return myStore.getState().userData.saved.jobs || null
    }
    static getSavedLessons = () => {
        return myStore.getState().userData.saved.lessons || null
    }
    static getAppliedJobs = () => {
        return myStore.getState().userData.jobsApplied || null
    }
    static getAccomplishedLessons = () => {
        return myStore.getState().userData.accomplished.lessons || null
    }
    static getAccomplishedTasks = () => {
        return myStore.getState().userData.accomplished.tasks || null
    }
    static getUserData = () => {
        return myStore.getState().userData;
    }
    static addPoints = (amount) => {
        if (amount > 0) { // if number positive == points earned, not spent
            myStore.dispatch(addTotalPoints(amount))
        }
        let points = myStore.getState().userData.points + amount
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
    static updateUser = async () => {
        console.log(this.getUserData())
        return await axios.post('users/update/' + this.getUserId(), this.getUserData())
    }
}

