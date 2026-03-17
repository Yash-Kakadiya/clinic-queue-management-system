import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import prescriptionService from '../services/prescriptionService'

function AddPrescription() {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const appointmentId = searchParams.get('appointmentId') || ''
    const [medicines, setMedicines] = useState(
        [
            {
                name: '',
                dosage: '',
                duration: ''
            }
        ]
    )
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)

    const handleMedicineChange = (index, field, value) => {
        const updated = [...medicines]
        updated[index][field] = value
        setMedicines(updated)
    }
    const addMedicineRow = () => {
        setMedicines(
            [
                ...medicines,
                {
                    name: '',
                    dosage: '',
                    duration: ''
                }
            ]
        )
    }
    const removeMedicineRow = (index) => {

        if (medicines.length === 1) {
            return
        }

        const updated = medicines.filter((temp, i) => i !== index)
        setMedicines(updated)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!appointmentId) {
            alert('Provide appointment ID you ...')
            return
        }

        setLoading(true)

        try {

            await prescriptionService.addPrescription(appointmentId, { medicines, notes })
            alert('Prescription added!')
            navigate('/doctor')
            setLoading(false)

        } catch (err) {

            alert(err.response?.data?.error || 'Failed')
            setLoading(false)

        }
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Add Prescription</h4>

            <div className='card' style={{ maxWidth: '700px' }}>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Appointment ID</label>
                            <input type='text' className='form-control' value={appointmentId} readOnly />
                        </div>

                        <h6>Medicines</h6>
                        {medicines.map((med, index) => (
                            <div className='row mb-2' key={index}>
                                <div className='col'>
                                    <input type='text' className='form-control' placeholder='Medicine name'
                                        value={med.name} onChange={(e) => handleMedicineChange(index, 'name', e.target.value)} required />
                                </div>
                                <div className='col'>
                                    <input type='text' className='form-control' placeholder='Dosage (e.g. 500mg)'
                                        value={med.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} required />
                                </div>
                                <div className='col'>
                                    <input type='text' className='form-control' placeholder='Duration (e.g. 5 days)'
                                        value={med.duration} onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)} required />
                                </div>
                                <div className='col-auto'>
                                    <button type='button' className='btn btn-danger btn-sm' onClick={() => removeMedicineRow(index)}>
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type='button' className=' mb-3 btn btn-secondary btn-sm' onClick={addMedicineRow}>
                            + Add Medicine
                        </button>

                        <div className='mb-3'>
                            <label className='form-label'>Notes (optional)</label>
                            <textarea className='form-control' rows='2' value={notes}
                                onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>

                        <button type='submit' className=' me-2 btn btn-primary' disabled={loading}>
                            {loading ? 'Saving...' : 'Save Prescription'}
                        </button>
                        <button type='button' className='btn btn-secondary' onClick={() => navigate('/doctor')}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPrescription