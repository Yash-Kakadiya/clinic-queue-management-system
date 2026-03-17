import { useState, useEffect } from 'react'
import reportService from '../services/reportService'

function MyReports() {

    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchReports()
    }, [])

    const fetchReports = async () => {

        try {

            const data = await reportService.getMyReports()
            setReports(data)
            setLoading(false)
        } catch (err) {

            alert('Failed to load reports')
            setLoading(false)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>My Reports</h4>

            {reports.length === 0 ? (
                <p className='text-muted'>No reports found.</p>
            ) : (
                reports.map((report, index) => (
                    <div className=' mb-3 card' key={index}>
                        <div className='card-body'>
                            <h6>Appointment #{report.appointmentId} | Dr. {report.doctor?.name || 'N/A'}</h6>
                            <p><b>Diagnosis:</b> {report.diagnosis}</p>
                            {report.testRecommended && (
                                <p><b>Test Recommended:</b> {report.testRecommended}</p>
                            )}
                            {report.remarks && (
                                <p><b>Remarks:</b> {report.remarks}</p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default MyReports