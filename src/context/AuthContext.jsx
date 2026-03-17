import { useState, useEffect, createContext, useContext } from 'react'
import authService from '../services/authService'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // chwck if log in
    useEffect(() => {

        const token = localStorage.getItem('token')
        const savedUser = localStorage.getItem('user')

        if (token && savedUser) {

            try {

                setUser(JSON.parse(savedUser))

            } catch (err) {

                localStorage.removeItem('token')
                localStorage.removeItem('user')

            }
        }
        setLoading(false)
    }, [])


    // login
    const login = async (email, password) => {

        try {

            const data = await authService.login(email, password)


            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))

            setUser(data.user)

            return { success: true }
        } catch (err) {

            return {
                success: false,
                message: err.response?.data?.error || 'login failed!'
            }

        }
    }


    // logout
    const logout = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)

    }

    return (

        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>

    )
}
