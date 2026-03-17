import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../App.css'

function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('ok');

        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await login(email, password)

        if (result.success) {

            const user = JSON.parse(localStorage.getItem('user'))

            if (user.role === 'admin') {
                navigate('/admin')
            }
            else if (user.role === 'patient') {
                navigate('/patient')
            }
            else if (user.role === 'receptionist') {
                navigate('/receptionist')
            }
            else if (user.role === 'doctor') {
                navigate('/doctor')
            }
            else {
                navigate('/')
            }
        } else {
            setError(result.message)
        }

        setLoading(false)
    }

    return (
        <div className=' login-bg'>
            <div className='card shadow' style={{ width: '400px' }}>
                <div className=' card-body p-4'>
                    <h3 className=' mb-2 text-center'>Clinic Queue</h3>
                    <p className=' mb-4 text-center text-muted'>Log in</p>

                    {error && (
                        <div className='alert alert-danger py-2'>{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Password</label>
                            <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                            {loading ? 'Loging in...' : 'Log in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
