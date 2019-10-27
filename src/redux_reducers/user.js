export const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return true;
        case "SIGN_OUT":
            return false;
        default:
            return state;
    }
}

const userData = {
    birthdate: '',
    email: '',
    phonenumber: '',
    city: '',
    picture: { url: '' },
    country: '',
    surname: '',
    name: '',
    userName: '',
    userType: ''
}
export const userDataReducer = (state = userData, action) => {
    if (action.type === "SET_USER_DATA") {
        return action.payload
    }
    return state;
}
