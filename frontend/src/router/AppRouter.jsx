import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from '../views/auth/LoginPage'
import CartPage from '../views/cart/CartPage'
import AdminDashboard from '../views/admin/AdminDashboard'
import CatalogPage from '../views/catalog/CatalogPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Navbar de desarrollo */}
      <nav className="bg-gray-950 text-white p-4 flex gap-6 shadow-md">
        <Link to="/" className="hover:text-blue-400 font-semibold transition-colors">Catálogo </Link>
        <Link to="/carrito" className="hover:text-orange-400 font-semibold transition-colors">Carrito </Link>
        <Link to="/admin" className="hover:text-red-400 font-semibold transition-colors">Admin  </Link>
        <Link to="/login" className="hover:text-purple-400 font-semibold transition-colors">Login </Link>
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