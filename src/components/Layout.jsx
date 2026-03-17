import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Layout() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const getDashboardPath = () => {
        if (!user) return '/login'

        switch (user.role) {
            case 'admin':
                return '/admin'
            case 'patient':
                return '/patient'
            case 'receptionist':
                return '/receptionist'
            case 'doctor':
                return '/doctor'
            default:
                return '/login'
        }
    }
    // navbar
    const getNavLinks = () => {

        if (!user) {
            return []
        }

        switch (user.role) {
            case 'admin':
                return [
                    { to: '/admin', label: 'My Clinic' },
                    { to: '/admin/users', label: 'Users' },
                ]
            case 'patient':
                return [
                    { to: '/patient', label: 'Dashboard' },
                    { to: '/patient/book', label: 'Book Appointment' },
                    { to: '/patient/appointments', label: 'My Appointments' },
                    { to: '/patient/prescriptions', label: 'My Prescriptions' },
                    { to: '/patient/reports', label: 'My Reports' },
                ]
            case 'receptionist':
                return [
                    { to: '/receptionist', label: 'Queue' },
                ]
            case 'doctor':
                return [
                    { to: '/doctor', label: "Today's Queue" },
                    { to: '/doctor/add-prescription', label: 'Add Prescription' },
                    { to: '/doctor/add-report', label: 'Add Report' },
                ]
            default:
                return []
        }
    }

    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
                <div className='container'>
                    <Link className='navbar-brand' to={getDashboardPath()}>
                        Clinic Queue
                    </Link>

                    {user && (
                        <span className='text-light me-2'>
                            {user.clinicName} <span className='badge bg-light text-primary'>{user.role}</span>
                        </span>
                    )}

                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#mainNav'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='mainNav'>
                        <ul className='navbar-nav me-auto'>
                            {getNavLinks().map((link) => (
                                <li className='nav-item' key={link.to}>
                                    <Link className='nav-link' to={link.to}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>

                        <button className='btn btn-outline-light btn-sm' onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className=' mt-4 container'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout