import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import appointmentService from '../services/appointmentService'

function MyAppointments() {

    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAppointments()
    }, [])

    const fetchAppointments = async () => {

        try {

            const data = await appointmentService.getMyAppointments()
            setAppointments(data)
            setLoading(false)

        } catch (err) {

            alert('Failed to load appointments!')
            setLoading(false)

        }
    }

    // badges
    const getStatusBadge = (status) => {

        switch (status) {
            case 'queued':
                return 'bg-warning text-dark'
            case 'in_progress':
                return 'bg-info'
            case 'done':
                return 'bg-success'
            case 'cancelled':
                return 'bg-danger'
            default:
                return 'bg-secondary'
        }

    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>My Appointments</h4>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Token</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? (
                        <tr><td colSpan='5' className='text-center'>No appointments found!</td></tr>
                    ) : (
                        appointments.map((apt) => (
                            <tr key={apt.id}>
                                <td>{apt.appointmentDate}</td>
                                <td>{apt.timeSlot}</td>
                                <td><span className={'badge ' + getStatusBadge(apt.status)}>{apt.status}</span></td>
                                <td>{apt.queueEntry ? apt.queueEntry.tokenNumber : '—'}</td>
                                <td>
                                    <Link to={'/patient/appointments/' + apt.id} className='btn btn-primary btn-sm'>
                                        View Details
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

export default MyAppointments