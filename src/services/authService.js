import api from './api'

// login
const login = async (email, password) => {

    const res = await api.post('/auth/login', { email, password })
    return res.data

}

const authService = { login }

export default authService