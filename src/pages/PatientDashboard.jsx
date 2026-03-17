import { useAuth } from '../context/AuthContext'

function PatientDashboard() {

    const { user } = useAuth()

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Dashboard</h4>
            <div className='card'>
                <div className='card-body'>
                    <h5>Welcome, {user?.name}!</h5>
                    <p className='text-muted'>You are logged in as a patient at <b>{user?.clinicName}</b>.</p>
                    <p>you can use the navigation above to book appointments, view your prescriptions and reports.</p>
                </div>
            </div>
        </div>
    )
}

export default PatientDashboard