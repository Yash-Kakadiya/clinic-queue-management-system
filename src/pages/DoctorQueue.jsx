import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queueService from '../services/queueService'

function DoctorQueue() {

    const [queue, setQueue] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchQueue()
    }, [])

    const fetchQueue = async () => {

        try {

            const data = await queueService.getDoctorQueue()
            setQueue(data)
            setLoading(false)

        } catch (err) {

            alert('Failed to load queue')
            setLoading(false)

        }
    }

    // badge
    const getStatusBadge = (status) => {

        switch (status) {
            case 'waiting':
                return 'bg-warning text-dark'
            case 'in_progress':
                return 'bg-info'
            case 'done':
                return 'bg-success'
            default:
                return 'bg-secondary'
        }

    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Today's Queue</h4>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Patient</th>
                        <th>Status</th>
                        <th>Appointment ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.length === 0 ? (
                        <tr><td colSpan='5' className='text-center'>No patients in queue today</td></tr>
                    ) : (
                        queue.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.tokenNumber}</td>
                                <td>{entry.patientName}</td>
                                <td><span className={'badge ' + getStatusBadge(entry.status)}>{entry.status}</span></td>
                                <td>{entry.appointmentId}</td>
                                <td>
                                    <Link to={'/doctor/add-prescription?appointmentId=' + entry.appointmentId}
                                        className=' me-1 btn btn-primary btn-sm'>
                                        Add medicine
                                    </Link>
                                    <Link to={'/doctor/add-report?appointmentId=' + entry.appointmentId}
                                        className='btn btn-primary btn-sm'>
                                        Add report
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DoctorQueue