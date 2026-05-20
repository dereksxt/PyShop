import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const [cart, setCart] = useState([])
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return navigate('/login')
    fetchCart()
  }, [])

  const fetchCart = async () => {
    const response = await api.get('/cart/')
    setCart(response.data)
  }

  const removeItem = async (productId) => {
    await api.delete(`/cart/remove/${productId}`)
    fetchCart()
  }

  const checkout = async () => {
    const items = cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }))
    await api.post('/orders/', { items })
    alert('Pedido realizado con éxito')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>MonlauShop</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Tu carrito</h2>
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
            <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Ver productos</button>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.product_id} className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Producto #{item.product_id}</p>
                  <p className="text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.product_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              onClick={checkout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mt-4"
            >
              Confirmar pedido
            </button>
          </>
        )}
      </div>
    </div>
  )
}