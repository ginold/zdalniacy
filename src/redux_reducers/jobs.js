const jobsData = {
    jobs: []
}
export const jobsReducer = (state = jobsData, action) => {
    if (action.type === "SET_JOBS") {
        return { ...state, jobs: action.payload }
    }
    if (action.type === "GET_JOBS") {
        return state.jobs
    }
    return state;
}
