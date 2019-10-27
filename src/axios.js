import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/'
})
const isHandlerEnabled = (config = {}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ?
        false : true
}
const requestHandler = (request) => {
    if (isHandlerEnabled(request)) {
        // Modify request here
        request.headers['Auth'] = 'Auth'
    }
    return request
}

const errorHandler = (error) => {
    if (isHandlerEnabled(error.config)) {
        // Handle errors
    }
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    if (isHandlerEnabled(response.config)) {
        // Handle responses
    }
    return response
}
// Add interceptors
axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)

axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)

export default axiosInstance;