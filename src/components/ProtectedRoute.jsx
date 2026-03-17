import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, allowedRoles }) {

    const { user, loading } = useAuth()

    if (loading) {
        return <div className='mt-5 text-center'>Loading...</div>
    }

    // not logged in
    if (!user) {
        return <Navigate to='/login' />
    }

    // check role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to='/' />
    }

    return children
}

export default ProtectedRoute