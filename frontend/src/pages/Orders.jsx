import { useState, useEffect } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const { token } = useAuth()
  const navigate = useNavigate()

  const fetchOrders = async () => {
    const response = await api.get('/orders/')
    setOrders(response.data)
  }

  useEffect(() => {
    if (!token) return navigate('/login')
    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>MonlauShop</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Mis pedidos</h2>
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No tienes pedidos aún</p>
            <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Ver productos</button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Pedido #{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>{order.status}</span>
              </div>
              <p className="text-blue-600 font-bold">{order.total.toFixed(2)}€</p>
              <p className="text-gray-400 text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}