import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1'
})

// 1. EL MENSAJERO: Antes de enviar cualquier petición, adjunta el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 2. NUEVO - EL GUARDIA DE SEGURIDAD: Analiza las respuestas que llegan del backend
api.interceptors.response.use(
  (response) => {
    // Si la petición es un éxito, la deja pasar
    return response
  },
  (error) => {
    // Si hay un error y el código es 401 (No Autorizado / Token caducado)
    if (error.response && error.response.status === 401) {
      console.warn("Por seguridad, tu sesión ha expirado o es inválida.")
      
      // Destruimos la prueba del delito
      localStorage.removeItem('token')
      
      // Si no estamos ya en el login o register, forzamos la redirección
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api