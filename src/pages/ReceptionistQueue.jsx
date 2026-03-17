import { useState } from 'react'
import queueService from '../services/queueService'

function ReceptionistQueue() {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [queue, setQueue] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetched, setFetched] = useState(false)

    const fetchQueue = async () => {

        setLoading(true)

        try {

            const data = await queueService.getQueue(date)
            setQueue(data)
            setFetched(true)
            setLoading(false)
        } catch (err) {

            alert('Failed to load queue')
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (id, newStatus) => {

        try {

            await queueService.updateStatus(id, newStatus)
            fetchQueue()
        } catch (err) {

            alert(err.response?.data?.error || 'Failed to update status')

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
            case 'skipped':
                return 'bg-danger'
            default:
                return 'bg-secondary'
        }
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Queue Management</h4>

            <div className=' mb-3 d-flex align-items-center gap-2'>
                <input type='date' className='form-control' style={{ maxWidth: '200px' }} value={date} onChange={(e) => setDate(e.target.value)} />
                <button className='btn btn-primary' onClick={fetchQueue} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Queue'}
                </button>
            </div>

            {fetched && (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Patient</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queue.length === 0 ? (
                            <tr><td colSpan='5' className='text-center'>No entries in queue for this date</td></tr>
                        ) : (
                            queue.map((entry) => (
                                <tr key={entry.id}>
                                    <td>{entry.tokenNumber}</td>
                                    <td>{entry.appointment?.patient?.name || '—'}</td>
                                    <td>{entry.appointment?.patient?.phone || '—'}</td>
                                    <td><span className={'badge ' + getStatusBadge(entry.status)}>{entry.status}</span></td>
                                    <td>
                                        {entry.status === 'waiting' && (
                                            <>
                                                <button className='btn btn-info btn-sm me-1'
                                                    onClick={() => handleStatusUpdate(entry.id, 'in-progress')}>
                                                    In Progress
                                                </button>
                                                <button className='btn btn-danger btn-sm'
                                                    onClick={() => handleStatusUpdate(entry.id, 'skipped')}>
                                                    Skip
                                                </button>
                                            </>
                                        )}
                                        {entry.status === 'in_progress' && (
                                            <button className='btn btn-success btn-sm'
                                                onClick={() => handleStatusUpdate(entry.id, 'done')}>
                                                Done
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ReceptionistQueue