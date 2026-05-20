import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from '../views/auth/LoginPage'
import CartPage from '../views/cart/CartPage'
import AdminDashboard from '../views/admin/AdminDashboard'
import CatalogPage from '../views/catalog/CatalogPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <nav className="main-navbar">
        <span className="navbar-brand">🛍️ Monlau Shop</span>
        
        <Link to="/" className="navbar-link">Catálogo</Link>
        <Link to="/carrito" className="navbar-link">Carrito</Link>
        <Link to="/admin" className="navbar-link">Admin</Link>
        <Link to="/login" className="navbar-link navbar-link-login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}