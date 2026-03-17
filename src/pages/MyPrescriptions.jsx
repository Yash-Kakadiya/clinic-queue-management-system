import { useState, useEffect } from 'react'
import prescriptionService from '../services/prescriptionService'

function MyPrescriptions() {

    const [prescriptions, setPrescriptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPrescriptions()
    }, [])

    const fetchPrescriptions = async () => {

        try {

            const data = await prescriptionService.getMyPrescriptions()
            setPrescriptions(data)
            setLoading(false)

        } catch (err) {

            alert('Failed to load prescriptions')
            setLoading(false)

        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>My Prescriptions</h4>

            {prescriptions.length === 0 ? (
                <p className='text-muted'>No prescriptions found.</p>
            ) : (
                prescriptions.map((presc, index) => (
                    <div className=' mb-3 card' key={index}>
                        <div className='card-body'>
                            <h6>Appointment #{presc.appointmentId} | Dr. {presc.doctor?.name || 'N/A'}</h6>
                            {presc.notes && <p className='text-muted'>{presc.notes}</p>}
                            <table className='table table-sm'>
                                <thead>
                                    <tr>
                                        <th>Medicine</th>
                                        <th>Dosage</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {presc.medicines && presc.medicines.map((med, i) => (
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
                ))
            )}
        </div>
    )
}

export default MyPrescriptions