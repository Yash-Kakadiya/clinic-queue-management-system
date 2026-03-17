import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import reportService from '../services/reportService'

function AddReport() {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const appointmentId = searchParams.get('appointmentId') || ''

    const [formData, setFormData] = useState(
        {
            diagnosis: '',
            testRecommended: '',
            remarks: ''
        }
    )
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!appointmentId) {
            alert('Provide ID!')
            return
        }

        setLoading(true)

        try {

            await reportService.addReport(appointmentId, formData)
            alert('Report added!')
            navigate('/doctor')
            setLoading(false)

        } catch (err) {

            alert(err.response?.data?.error || 'Failed!')
            setLoading(false)

        }
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Add Report</h4>

            <div className='card' style={{ maxWidth: '500px' }}>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Appointment ID</label>
                            <input type='text' className='form-control' value={appointmentId} readOnly />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Diagnosis</label>
                            <input type='text' className='form-control' name='diagnosis'
                                value={formData.diagnosis} onChange={handleChange} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Test Recommended (optional)</label>
                            <input type='text' className='form-control' name='testRecommended'
                                value={formData.testRecommended} onChange={handleChange} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Remarks (optional)</label>
                            <textarea className='form-control' name='remarks' rows='2'
                                value={formData.remarks} onChange={handleChange}></textarea>
                        </div>
                        <button type='submit' className=' me-2 btn btn-primary' disabled={loading}>
                            {loading ? 'Saving...' : 'Save Report'}
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

export default AddReport