import { useState, useEffect } from 'react'
import adminService from '../services/adminService'

function AdminDashboard() {

    const [clinic, setClinic] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchClinic()
    }, [])

    const fetchClinic = async () => {
        try {

            const data = await adminService.getClinic()
            setClinic(data)
            setLoading(false)

        } catch (err) {

            alert('failed to load clinic info!')
            setLoading(false)

        }
    }

    if (loading) {
        return <p>loading...</p>
    }

    if (!clinic) {
        return <p>no clinic data found.</p>
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>My Clinic</h4>

            <div className='card'>
                <div className='card-body'>
                    <h5>{clinic.name}</h5>
                    <p>
                        Clinic code: <span className='badge bg-secondary'>{clinic.code}</span>
                    </p>
                    <p className='text-muted'>
                        Share code with patients, doctors, and receptionists to join your clinic.
                    </p>
                    <p>
                        Users: {clinic.userCount} | Appointments: {clinic.appointmentCount}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard