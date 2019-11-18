
export const getJobs = () => {
    return {
        type: "GET_JOBS"
    }
}
export const setJobs = (jobs) => {
    return {
        type: "SET_JOBS",
        payload: jobs
    }
}