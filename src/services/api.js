import axios from 'axios'

// instance
const api = axios.create(
    {
        baseURL: 'https://cmsback.sampaarsh.cloud'
    }
)

// add token
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token')

        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }

        return config
    },
    (err) => {

        return Promise.reject(err)

    }
)

// 401-invalid token
api.interceptors.response.use(
    (response) => response,
    (err) => {
        if (err.response && err.response.status === 401) {

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

export default api