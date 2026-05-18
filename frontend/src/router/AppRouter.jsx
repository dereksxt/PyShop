import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CatalogPage from '../views/auth/CatalogPage'
import CartPage from '../views/cart/CartPage'
import AdminDashboard from '../views/admin/AdminDashboard'

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* Navbar de desarrollo para que el equipo pueda saltar de una pantalla a otra */}
      <nav className="bg-gray-950 text-white p-4 flex gap-6 shadow-md">
        <Link to="/" className="hover:text-blue-400 font-semibold transition-colors">Catálogo (Xan)</Link>
        <Link to="/carrito" className="hover:text-orange-400 font-semibold transition-colors">Carrito (C2)</Link>
        <Link to="/admin" className="hover:text-red-400 font-semibold transition-colors">Admin (C3)</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}