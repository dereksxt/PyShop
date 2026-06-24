import { createContext, useContext, useState, useEffect } from 'react'
import api from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isAdmin, setIsAdmin] = useState(false)
  const [isStudent, setIsStudent] = useState(false) // NUEVO: Estado del estudiante

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setIsAdmin(payload.is_admin)
        
        // LÓGICA VIP: Si tiene correo de Monlau, es estudiante oficial
        if (payload.email && payload.email.endsWith('@monlau.com')) {
          setIsStudent(true)
        } else {
          setIsStudent(false)
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error)
      }
    }
  }, [token])

  const login = async (email, password) => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    const response = await api.post('/auth/login', formData)
    const { access_token } = response.data

    localStorage.setItem('token', access_token)
    setToken(access_token)

    const payload = JSON.parse(atob(access_token.split('.')[1]))
    setIsAdmin(payload.is_admin)
    setIsStudent(payload.email && payload.email.endsWith('@monlau.com'))
    
    return payload.is_admin 
  }

  const register = async (email, username, password) => {
    await api.post('/auth/register', { email, username, password })
    return await login(email, password) 
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsAdmin(false)
    setIsStudent(false)
  }

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, isStudent, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}