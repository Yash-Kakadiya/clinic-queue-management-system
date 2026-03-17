import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appointmentService from '../services/appointmentService'

function AppointmentDetail() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [appointment, setAppointment] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDetail()
    }, [id])

    const fetchDetail = async () => {

        try {

            const data = await appointmentService.getById(id)
            setAppointment(data)
            setLoading(false)

        } catch (err) {

            alert('Failed to load appointment details')
            setLoading(false)

        }
    }

    if (loading) {
        return <p>Loading...</p>
    }
    if (!appointment) {
        return <p>Appointment not found.</p>
    }

    return (
        <div>
            <button className=' mb-3 btn btn-secondary btn-sm' onClick={() => navigate('/patient/appointments')}>
                &lt;- Back to Appointments
            </button>

            <h4 className=' mb-3 text-primary'>Appointment Details</h4>

            <div className=' mb-3 card'>
                <div className='card-body'>
                    <p><b>Date:</b> {appointment.appointmentDate}</p>
                    <p><b>Time Slot:</b> {appointment.timeSlot}</p>
                    <p><b>Status:</b> {appointment.status}</p>
                    {appointment.queueEntry && (
                        <p><b>Token Number:</b> {appointment.queueEntry.tokenNumber}</p>
                    )}
                </div>
            </div>


            <h5>Prescription</h5>
            {appointment.prescription ? (
                <div className=' mb-3 card'>
                    <div className='card-body'>
                        {appointment.prescription.notes && (
                            <p><b>Notes:</b> {appointment.prescription.notes}</p>
                        )}
                        <table className='table table-sm'>
                            <thead>
                                <tr>
                                    <th>Medicine</th>
                                    <th>Dosage</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.prescription.medicines && appointment.prescription.medicines.map((med, i) => (
                                    <tr key={i}>
                                        <td>{med.name}</td>
                                        <td>{med.dosage}</td>
                                        <td>{med.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className='text-muted'>No prescription yet.</p>
            )}

            {/* Report */}
            <h5>Report</h5>
            {appointment.report ? (
                <div className='card mb-3'>
                    <div className='card-body'>
                        <p><b>Diagnosis:</b> {appointment.report.diagnosis}</p>
                        {appointment.report.testRecommended && (
                            <p><b>Test Recommended:</b> {appointment.report.testRecommended}</p>
                        )}
                        {appointment.report.remarks && (
                            <p><b>Remarks:</b> {appointment.report.remarks}</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className='text-muted'>No report yet.</p>
            )}
        </div>
    )
}

export default AppointmentDetail