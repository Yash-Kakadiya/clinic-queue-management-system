import api from './api'

// get clinic info
const getClinic = async () => {

    const res = await api.get('/admin/clinic')
    return res.data

}

// get all users
const getUsers = async () => {

    const res = await api.get('/admin/users')
    return res.data

}

// add user
const createUser = async (data) => {

    const res = await api.post('/admin/users', data)
    return res.data

}

const adminService = { getClinic, getUsers, createUser }
export default adminService