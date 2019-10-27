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