export const signIn = () => {
    return {
        type: "SIGN_IN"
    }
}
export const signOut = () => {
    return {
        type: "SIGN_OUT"
    }
}
export const setUserData = (userData) => {
    return {
        type: "SET_USER_DATA",
        payload: userData
    }
}
export const getPoints = () => {
    return {
        type: "GET_POINTS"
    }
}
export const addTotalPoints = (points) => {
    return {
        payload: points,
        type: "ADD_TOTAL_POINTS"
    }
}
export const setPoints = (points) => {
    return {
        type: "SET_POINTS",
        payload: points
    }
}
