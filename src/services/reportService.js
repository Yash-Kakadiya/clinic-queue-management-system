import api from './api'

// get reports
const getMyReports = async () => {

    const res = await api.get('/reports/my')
    return res.data

}

// add report
const addReport = async (appointmentId, data) => {

    const res = await api.post('/reports/' + appointmentId, data)
    return res.data

}

const reportService = { getMyReports, addReport }
export default reportService