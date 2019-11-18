
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
    saved: { lessons: [], jobs: [] },
    jobsApplied: [],
    familyname: '',
    accomplished: {
        lessons: [],
        tasks: []
    },
    firstname: '',
    points: 0,
    totalPoints: 0,
    userName: '',
    userType: '',
    prevPoints: 0
}
// state is immutable, can't access it like state.prop!
export const userDataReducer = (state = userData, action) => {
    if (action.type === "SET_USER_DATA") {
        return { ...state, ...action.payload }
    }
    if (action.type === "GET_POINTS") {
        return state.points
    }
    if (action.type === "ADD_TOTAL_POINTS") {
        const totalPoints = state.totalPoints + action.payload
        return { ...state, totalPoints }
    }
    if (action.type === "SET_POINTS") {
        return { ...state, points: action.payload, prevPoints: state.points }
    }
    return state;
}
