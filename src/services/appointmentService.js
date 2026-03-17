import api from './api'

// book appo
const book = async (data) => {

    const res = await api.post('/appointments', data)
    return res.data

}

// get appo
const getMyAppointments = async () => {

    const res = await api.get('/appointments/my')
    return res.data

}

// get appo details
const getById = async (id) => {

    const res = await api.get('/appointments/' + id)
    return res.data

}

const appointmentService = { book, getMyAppointments, getById }
export default appointmentService