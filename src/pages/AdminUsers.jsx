import { useState, useEffect } from 'react'
import adminService from '../services/adminService'

function AdminUsers() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient',
        phone: '',
    })

    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {

        try {

            const data = await adminService.getUsers()
            setUsers(data)
            setLoading(false)
        } catch (err) {

            alert('Failed to load users')
            setLoading(false)

        }
    }

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
        setSubmitting(true)

        try {

            await adminService.createUser(formData)

            alert('User created!')

            setFormData(
                {
                    name: '',
                    email: '',
                    password: '',
                    role: 'patient',
                    phone: '',
                }
            )

            fetchUsers()
            setSubmitting(false)

        } catch (err) {

            alert(err.response?.data?.error || 'Failed to create user')
            setSubmitting(false)

        }
    }

    // badge
    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-danger'
            case 'doctor':
                return 'bg-success'
            case 'receptionist':
                return 'bg-info'
            case 'patient':
                return 'bg-primary'
            default:
                return 'bg-secondary'
        }
    }

    return (
        <div>
            <h4 className=' mb-3 text-primary'>Clinic Users</h4>

            {/* form */}
            <div className=' mb-4 card'>
                <div className='card-body'>
                    <h6>Add receptionist, doctor, or patient</h6>
                    <p className='text-muted small'>Create a user in your clinic. They will sign in with the email and password you set (no registration).</p>

                    <form onSubmit={handleSubmit}>
                        <div className=' mb-2 row'>
                            <div className='col-md-6'>
                                <label className='form-label'>Name</label>
                                <input type='text' className='form-control' name='name'
                                    value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className='col-md-6'>
                                <label className='form-label'>Email</label>
                                <input type='email' className='form-control' name='email'
                                    value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-md-4'>
                                <label className='form-label'>Password</label>
                                <input type='password' className='form-control' name='password' placeholder='min 6 characters'
                                    value={formData.password} onChange={handleChange} required />
                            </div>
                            <div className='col-md-4'>
                                <label className='form-label'>Role</label>
                                <select className='form-select' name='role' value={formData.role} onChange={handleChange}>
                                    <option value='patient'>Patient</option>
                                    <option value='receptionist'>Receptionist</option>
                                    <option value='doctor'>Doctor</option>
                                </select>
                            </div>
                            <div className='col-md-4'>
                                <label className='form-label'>Phone (optional)</label>
                                <input type='text' className='form-control' name='phone'
                                    value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary btn-sm mt-2' disabled={submitting}>
                            {submitting ? 'Adding...' : 'Add user'}
                        </button>
                    </form>
                </div>
            </div>

            {/* list */}
            <h6>Users in this clinic</h6>
            {loading ? <p>Loading...</p> : (
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan='4' className='text-center'>No users found!</td></tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td><span className={'badge ' + getRoleBadge(u.role)}>{u.role}</span></td>
                                    <td>{u.phone || '—'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default AdminUsers