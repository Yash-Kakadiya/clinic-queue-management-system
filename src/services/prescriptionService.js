import api from './api'

// get pres
const getMyPrescriptions = async () => {

    const res = await api.get('/prescriptions/my')
    return res.data

}

// add pres
const addPrescription = async (appointmentId, data) => {

    const res = await api.post('/prescriptions/' + appointmentId, data)
    return res.data

}

const prescriptionService = { getMyPrescriptions, addPrescription }
export default prescriptionService