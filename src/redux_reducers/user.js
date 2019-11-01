
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
    familyname: '',
    firstname: '',
    points: 0,
    userName: '',
    userType: ''
}
// state is immutable, can't access it like state.prop!
export const userDataReducer = (state = userData, action) => {
    if (action.type === "SET_USER_DATA") {
        state = { ...state, ...action.payload }
    }
    if (action.type === "GET_POINTS") {
        return state.points
    }
    if (action.type === "SET_POINTS") {
        return { ...state, points: action.payload }
    }
    return state;
}
