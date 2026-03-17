import { useState } from 'react'
import appointmentService from '../services/appointmentService'

function BookAppointment() {

    const [date, setDate] = useState('')
    const [timeSlot, setTimeSlot] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const timeSlots = [
        '09:00-09:15',
        '09:15-09:30',
        '09:30-09:45',
        '09:45-10:00',
        '10:00-10:15',
        '10:15-10:30',
        '10:30-10:45',
        '10:45-11:00',
        '11:00-11:15',
        '11:15-11:30',
        '11:30-11:45',
        '11:45-12:00',
        '12:00-12:15',
        '12:15-12:30',
        '12:30-12:45',
        '12:45-13:00',
        '13:00-13:15',
        '13:15-13:30',
        '13:30-13:45',
        '13:45-14:00',
        '14:00-14:15',
        '14:15-14:30',
        '14:30-14:45',
        '14:45-15:00',
        '15:00-15:15',
        '15:15-15:30',
        '15:30-15:45',
        '15:45-16:00',
        '16:00-16:15',
        '16:15-16:30',
        '16:30-16:45',
        '16:45-17:00'
    ]
    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {

            await appointmentService.book(
                {
                    appointmentDate: date,
                    timeSlot: timeSlot
                }
            )
            setMessage('Appointment booked successfully!')
            setDate('')
            setTimeSlot('')
            setLoading(false)

        } catch (err) {

            setMessage(err.response?.data?.error || 'Booking failed')
            setLoading(false)
        }
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Book Appointment</h4>

            <div className='card' style={{ maxWidth: '500px' }}>
                <div className='card-body'>
                    {message && (
                        <div className={'alert ' + (message.includes('success') ? 'alert-success' : 'alert-danger') + ' py-2'}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Date</label>
                            <input type='date' className='form-control' value={date} onChange={(e) => setDate(e.target.value)} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Time slot</label>
                            <select className='form-select' value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                                <option value=''>Select a time slot</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-primary' disabled={loading}>
                            {loading ? 'Booking...' : 'Book'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default BookAppointment