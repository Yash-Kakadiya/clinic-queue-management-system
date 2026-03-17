import api from './api'

// get queue for date
const getQueue = async (date) => {

    const res = await api.get('/queue?date=' + date)
    return res.data

}

// update queue status
const updateStatus = async (id, status) => {

    const res = await api.patch('/queue/' + id, { status })
    return res.data

}

// get queue for doc
const getDoctorQueue = async () => {

    const res = await api.get('/doctor/queue')
    return res.data

}

const queueService = { getQueue, updateStatus, getDoctorQueue }
export default queueService