import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Admin from './pages/Admin'

export default function App() {
  // Sacamos el token para saber si está logueado, y el isAdmin para su rol
  const { token, isAdmin } = useAuth() 

  return (
    <Routes>
      {/*RUTAS DE CLIENTE: Si detectamos que eres Admin, te devolvemos a tu panel obligatoriamente */}
      <Route path="/" element={isAdmin ? <Navigate to="/admin" replace /> : <Products />} />
      <Route path="/cart" element={isAdmin ? <Navigate to="/admin" replace /> : <Cart />} />
      <Route path="/orders" element={isAdmin ? <Navigate to="/admin" replace /> : <Orders />} />

      {/*RUTAS DE INVITADO: Si YA tienes token, no puedes ver Login ni Register */}
      <Route 
        path="/login" 
        element={!token ? <Login /> : <Navigate to={isAdmin ? "/admin" : "/"} replace />} 
      />
      <Route 
        path="/register" 
        element={!token ? <Register /> : <Navigate to={isAdmin ? "/admin" : "/"} replace />} 
      />
      
      {/*RUTA PROTEGIDA DE ADMIN: Si no eres admin, te echa a la tienda */}
      <Route 
        path="/admin" 
        element={isAdmin ? <Admin /> : <Navigate to="/" replace />} 
      />
    </Routes>
  )
}