import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const fetchProducts = async (searchTerm = '') => {
    const response = await api.get(`/products/?search=${searchTerm}`)
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    fetchProducts(e.target.value)
  }

  const addToCart = async (productId) => {
    if (!token) return navigate('/login')
    await api.post(`/cart/add?product_id=${productId}&quantity=1`)
    alert('Producto añadido al carrito')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MonlauShop</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/cart')} className="text-gray-600 hover:text-blue-600">🛒 Carrito</button>
          {token
            ? <button onClick={logout} className="text-gray-600 hover:text-red-500">Cerrar sesión</button>
            : <button onClick={() => navigate('/login')} className="text-gray-600 hover:text-blue-600">Iniciar sesión</button>
          }
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearch}
          className="w-full border rounded-lg px-4 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <img
                src={product.image_url || 'https://placehold.co/400x400?text=MonlauShop'}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold text-lg mb-4">{product.price}€</p>
              <button
                onClick={() => addToCart(product.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}